//'use strict';
const express = require('express');
const misc = require('./scripts/misc');
const bodyParser = require('body-parser');
const { performance } = require('perf_hooks');
const fs = require('fs');
const app = express();

async function main() {
	const startup = performance.now();
	console.log("A Clockwork Magenta Registration server started at " + misc.getTime());

	//enable cross site scripting for development, not needed for production since frontend is statically served by the backend server
	if (process.env.NODE_ENV !== 'production') {
		const cors = require("cors");
		app.use(cors());
	}
	//bodyParser simplifies http request handling
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

	//use sync fileread in initial phase only!
	let config = require('ini').parse(fs.readFileSync(__dirname + '/../config/config.ini', 'utf-8'));
	console.log(`Config.ini loaded!`);

	const flowers = JSON.parse(fs.readFileSync(__dirname + '/../config/answerMapping/mappedFlowers.json'));
	const pictograms = JSON.parse(fs.readFileSync(__dirname + '/../config/answerMapping/mappedPictograms.json'));

	/**
     * Loader that reads all the language configurations from the specified directory
	 * Needs adaption on a Linux filesystem: ${directoryPath}\\${file} -> ${directoryPath}/${file} 
     */
	const path = require('path');
	const appDir = path.dirname(require.main.filename);
	const directoryPath = path.join(appDir, '../config/visitorTexts');
	let json = {};
	let countryCodes = [];
	fs.readdirSync(directoryPath).map(file => {
		const countryCode = file.match(/-(\w{2})\./)[1];
		countryCodes.push(countryCode);
		const languageJson = { [countryCode]: (JSON.parse(fs.readFileSync(`${directoryPath}\\${file}`))) };
		Object.assign(json, languageJson);
	});
	console.log(`${Object.keys(json).length} language configurations loaded!`);

	//Create DB if it doesn't exist
	const mysql = require('mysql2/promise');
	const connection = await mysql.createConnection({
		host: config.database.host,
		user: config.database.user,
		password: config.database.pass
	});
	await connection.query('CREATE DATABASE IF NOT EXISTS clockwork;');
	console.log(`Database has been initialized!`);

	// Create sequelize DB handler and tables if they don't exist
	const db = await require("../database/database")(config.database, performance);
	// Create DataCache instance
	const startCache = performance.now();
	const DataCache = await require("./datastore/DataCache")(db);
	const loadedCache = performance.now();
	console.log(`DataCache loaded in ${Math.trunc(loadedCache - startCache)}ms!`);

	// initialize API routes
	const visitor = require("./api/visitor")(express.Router(), db.Visitor, db.Product, db.Reserved, DataCache, { minStock: config.minStock, reservationTime: config.reservationTime.time }, json, countryCodes, flowers);
	const backoffice = require("./api/backoffice")(express.Router(), db.Visitor, DataCache, config.backoffice);
	const sales = require("./api/sales")(express.Router(), db.Visitor, DataCache, config.sales, pictograms);
	const warehouse = require("./api/warehouse")(express.Router(), db.Visitor, DataCache, config.warehouse);

	//handle api's for the associated frontend/interface
	app.use("/api", visitor);
	app.use("/api", backoffice);
	app.use("/api", sales);
	app.use("/api", warehouse);

	// handle production
	if (process.env.NODE_ENV !== 'production') {
		// Static folder
		app.use(express.static(__dirname + '/public/'));

		// Handle fronted routes
		app.get(/backoffice/, (req, res) => res.sendFile(__dirname + '/public/backoffice.html'));
		app.get(/sales/, (req, res) => res.sendFile(__dirname + '/public/sales.html'));
		app.get(/warehouse/, (req, res) => res.sendFile(__dirname + '/public/warehouse.html'));
		app.get(/^[$\/]/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
	}

	app.use((error, req, res, next) => {
		console.log(error);
		res.sendStatus(404);
	});

	let serverOptions = {
		key: fs.readFileSync(config.common.key),
		cert: fs.readFileSync(config.common.cert)
	};

	require('https').createServer(serverOptions, app).listen(config.common.sslPort, () => console.log(`server | https server listening on ${config.common.sslPort}`));
	require('http').createServer(app).listen(config.common.testPort, () => {
		console.log(`server | http server listening on ${config.common.testPort}`);
		const started = performance.now();
		console.log(`Server booted in ${Math.trunc(started - startup)}ms!`);
	});

	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', misc.handleConsole);
	console.info("server | keyboard control enabled!");
}

(async () => {
	await main().then();
})();
