module.exports = (router, Visitor, DataCache, config, pictograms) => {
    const jwt = require('jsonwebtoken');
    const signOptions = { expiresIn: "24h" };

    /**
     * JWT verification 
     * @param {HTTP request} req 
     * @param {HTTP response} res 
     * @param {function} next 
     */
    const verifyToken = (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    };
    // Authenticate with JWT
    router.post("/salesAuth", (req, res) => {
        const parsedAuth = JSON.parse(req.body.body);
        const user = parsedAuth.user;
        const password = parsedAuth.password;
        if (user === config.user && config.pass === password) {
            jwt.sign({ user }, config.privateKey, signOptions, (err, token) => {
                res.json({
                    token
                });
            });
        } else {
            res.sendStatus(403);
        }
    });

    // Get sales config and products
    router.get('/salesConfig', verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, async (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                const products = await DataCache.getProducts();
                const productNames = products.map(product => {return {id: product.product_id, name: product.product_name}});
                const salesConfig = {
                    productionTime: config.productionTime,
                    pollingInterval: config.pollingInterval,
                    hot: config.hot,
                    warm: config.warm,
                    cold: config.cold,
                    unknown: config.unknown,
                };
                res.json({salesConfig, productNames, pictograms});
            }
        });
    });

    // Get salesList
    router.get("/salesList", verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, async (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                const visitors = await DataCache.getSalesList();
                res.json(visitors);
            }
        });
    });

    // update Visitor
    router.get('/salesStatus', verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, async (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                try {
                    const visitor = JSON.parse(req.query.visitor);
                    await DataCache.updateVisitor(visitor, 'sales');
                    const visitors = await DataCache.getSalesList();
                    Visitor.update({
                        first_name: visitor.first_name,
                        last_name: visitor.last_name,
                        company: visitor.company,
                        job_title: visitor.job_title,
                        email: visitor.email,
                        phone: visitor.phone,
                        appointment: visitor.appointment,
                        social_media_url: visitor.social_media_url,
                        handled_by_sales: visitor.handled_by_sales
                    },
                        {
                            where: { user_hash_id: visitor.user_hash_id }
                        });
                    res.sendStatus(200);
                } catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

            }
        });
    });
    
    return router;
};