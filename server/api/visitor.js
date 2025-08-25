/*jshint esversion: 8 */

module.exports = (router, Visitor, Product, Reserved, DataCache, config, json, countryCodes, flowers) => {
    const fs = require('fs');
    const uuid = require('uuid');
    // Get UUID 
    router.get("/assignUUID", async (req, res) => {
        try {
            const id = await uuid.v4();
            const primaryLanguage = req.acceptsLanguages(...countryCodes);
            if (primaryLanguage) {
                res.json({ user_hash_id: id, json: json[primaryLanguage], timeout: config.reservationTime, languages: countryCodes });
            } else {
                res.json({ user_hash_id: id, json: json.en, timeout: config.reservationTime, languages: countryCodes });
            }
        } catch (err) {
            console.log(err);
            res.status(400);
            res.send(`error: ${err}`);
        }
    });

    // Get JSON
    router.post("/language", async (req, res) => {
        try {
            const language = await req.body.language;
            if (json[language] === undefined) {
                res.json({ json: json.en });
            } else {
                res.json({ json: json[language] });
            }
        } catch (err) {
            console.log(err);
            res.status(400);
            res.send(`error: ${err}`);
        }
    });

    // Get Flower
    router.post("/flower", async (req, res) => {
        try {
            const answers = Object.values(req.body.body).map(answer => 'A'+(answer.answer+1));
            const parsedIndex = answers.join("_");
            res.json({src: flowers[parsedIndex].img});
        } catch (err) {
            console.log(err);
            res.status(400);
            res.send(`error: ${err}`);
        }
    });

    // Get available products, clean timed out reservations and set availability
    router.get("/availableProducts", async (req, res) => {
        try {
            const deleteThese = await DataCache.updateReservations(config.reservationTime);
            await Reserved.destroy({ where: { reserved_hash_id: [...deleteThese] } });
            const products = await DataCache.getProducts();
            const unavailableProducts = [];
            products.forEach(product => {
                const productReservations = DataCache.getReserved(product.product_id);
                if (product.stock - productReservations < config.minStock[product.product_name]) {
                    DataCache.updateProducts(product.product_id, available, false);
                    unavailableProducts.push(product.product_id);
                }
            });
            if (unavailableProducts.length) {
                Product.update({
                    available: 0
                },
                    {
                        where: {
                            product_id: [...unavailableProducts]
                        }
                    }
                );
            }

            const availableProducts = await DataCache.queryProducts({ subject: "available", value: 1 });
            const productSrc = availableProducts.map(product => product.product_picture_url);
            const duplicates = getDuplicates(productSrc);
            const parsedProducts = parseProducts(duplicates, availableProducts);

            res.json(parsedProducts);
        } catch (err) {
            console.log(err);
            res.status(400);
            res.send(`error: ${err}`);
        }
    });

    // Add reservation, clean timed out reservations
    router.post("/makeReservation", async (req, res) => {
        try {
            const products = await DataCache.getProducts();
            const productId = typeof req.body.reservation.reserved_product === "string" ? parseInt(req.body.reservation.reserved_product) : req.body.reservation.reserved_product;
            if (!products.map(({ product_id }) => product_id).includes(productId)) {
                throw new Error('INVALID PRODUCT ID');
            }
            const deleteThese = await DataCache.updateReservations(config.reservationTime, req.body.reservation);
            Reserved.destroy({ where: { reserved_hash_id: [...deleteThese] } });
            Reserved.create({
                reserved_hash_id: req.body.reservation.reserved_hash_id,
                reserved_product: productId,
                time_of_reservation: req.body.reservation.time_of_reservation
            });
            res.status(200);
            res.json("Reservation was made!");
        } catch (err) {
            console.log(err);
            res.status(400);
            res.send(`error: ${err}`);
        }
    });

    // Insert Visitor, decrement product stock 
    router.post("/createNewVisitor", async (req, res) => {
        try {
            const visitorData = req.body.visitor;
            const isImg = /^data:image\/((jpeg)|(jpg)|(png));base64,/.test(visitorData.business_card);
            if ((!isImg &&
                (visitorData.first_name.length < 2 ||
                    visitorData.last_name.length < 2 ||
                    visitorData.company.length < 3 ||
                    visitorData.job_title.length < 3))
            ) {
                throw new Error('INVALID PARAMETER LENGTH');
            }
            if (visitorData.business_card !== '' && !isImg) {
                throw new Error('INVALID FILE');
            }
            const base64Data = await visitorData.business_card.replace(/^data:image\/((jpeg)|(jpg)|(png));base64,/, "");
            if (visitorData.business_card !== '') {
                fs.writeFile(`../registration/server/public/img/cards/${visitorData.user_hash_id}.jpg`, base64Data, 'base64', err => {
                    if (err) {
                        console.log(err);
                        console.log('err');
                    } else {
                        console.log(`${visitorData.user_hash_id}.jpg was saved!`);
                    }
                });
                visitorData.business_card = `/img/cards/${visitorData.user_hash_id}.jpg`;
            }
            const answers = [visitorData.answer_one, visitorData.answer_two, visitorData.answer_three].map(answer => 'A'+(answer+1));
            const parsedIndex = answers.join("_");
            const parameters = JSON.parse(flowers[parsedIndex].parameters);
            const timeStamp = new Date();
            await Visitor.create({
                user_hash_id: visitorData.user_hash_id,
                first_name: visitorData.first_name,
                last_name: visitorData.last_name,
                company: visitorData.company,
                job_title: visitorData.job_title,
                email: visitorData.mail,
                phone: visitorData.phone,
                product_type: visitorData.product_type,
                parameter_excenterLeft: parameters[0],
                parameter_excenterRight: parameters[1],
                parameter_speedLeft: parameters[2],
                parameter_speedRight: parameters[3],
                business_card: visitorData.business_card == '' ? null : visitorData.business_card,
                answer_three: visitorData.answer_three+1,
                answer_two: visitorData.answer_two+1,
                answer_one: visitorData.answer_one+1,
                time_of_registration: timeStamp
            });
            const visitor = await Visitor.findAll({
                where: {
                    user_hash_id: visitorData.user_hash_id
                }
            });

            // also decrements the product.stock in DataCache
            await DataCache.updateVisitor(JSON.parse(JSON.stringify(visitor))[0]);

            const product = await DataCache.queryProducts({ subject: "product_id", value: visitorData.product_type });
            await Product.update({
                stock: product[0].stock
            },
                {
                    where: {
                        product_id: visitorData.product_type
                    }
                });
            res.status(201);
            res.json('Visitor created!');
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(`error: ${err}`);
        }
    });

    // Get Status 
    router.post("/status", async (req, res) => {
        try {
            const id = req.body.visitor_hash_id;
            const visitor = await DataCache.queryVisitors(id);
            res.json(visitor.state_of_production);
        } catch (err) {
            console.log(err);
            res.status(400);
            res.send(`error: ${err}`);
        }
    });

    /**
     * Returns an array of arrays.
     * The first array holds all non duplicate values.
     * Every consecutive array holds the indices of the duplicates to the corresponding value of the passed array
     * Slow due to lastIndexOf-Usage -> beware on usage for big arrays
     * @param {Array} array 
     * @return {Array of arrays}
     */
    function getDuplicates(array) {
        const duplicates = {
            notDuplicate: []
        };
        array.forEach((value, index, array) => {
            if (duplicates.hasOwnProperty(value)) {
                duplicates[value].push(index);
            } else if (array.lastIndexOf(value) !== index) {
                duplicates[value] = [index];
            } else {
                duplicates.notDuplicate.push(index);
            }
        });
        return Object.values(duplicates);
    }

    /**
     * Parses the available products from the DataCache and rearranges products with multiple options (eg. size/color/etc.)
     * Parsing happens due to duplicate values in the product_picture_url, that indicates such options
     * @param {array} duplicates 
     * @param {array} availableProducts 
     */
    function parseProducts(duplicates, availableProducts) {
        const parsedProducts = [];
        duplicates.forEach((array, index) => {
            if (!index) {
                const parsedProduct = {
                    id: "",
                    name: "",
                    product_picture_url: ""
                };
                array.forEach(indice => {
                    parsedProduct.id = availableProducts[indice].product_id;
                    parsedProduct.name = availableProducts[indice].product_name;
                    parsedProduct.product_picture_url = availableProducts[indice].product_picture_url;
                    parsedProducts.push(parsedProduct);
                });
            } else {
                const parsedProduct = {
                    dropdown: []
                };
                array.forEach(indice => {
                    const product = availableProducts[indice];
                    const productName = product.product_name.match(/([^\W_]{0,50}-[^\W_]{0,50}){1,5}/);
                    if (!parsedProduct.product_name) {
                        Object.assign(parsedProduct, { product_name: productName[0] });
                        Object.assign(parsedProduct, { product_picture_url: product.product_picture_url });
                    }
                    const dropdownProduct = {
                        id: product.product_id,
                        name: product.product_name.replace(/[-_]/g, ' ')
                    };
                    parsedProduct.dropdown.push(dropdownProduct);
                });
                parsedProducts.push(parsedProduct);
            }
        });
        return parsedProducts;
    }
    return router;
};