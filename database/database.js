
module.exports = async config => {
	try {
		const Sequelize = require("sequelize");

		// Setup Connection
		const sequelize = new Sequelize(config.database, config.user, config.pass, {
			host: config.host,
			dialect: "mysql",
			operatorsAliases: false,
			logging: false,

			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		});

		// test connection
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		// Connect all models to one object for better accessibility
		const db = {};

		db.sequelize = sequelize;
		db.Sequelize = Sequelize;

		// Models/Tabels
		db.Visitor = require('./model/Visitor')(sequelize, Sequelize);
		db.Product = require('./model/Product')(sequelize, Sequelize);
		db.Reserved = require('./model/Reserved')(sequelize, Sequelize);

		// Create table if not exist 
		await sequelize.sync({ force: false })
		console.log(`Tables have been initialized!`);
		return db;
	} catch (err) {
		console.log(err);
	}
};