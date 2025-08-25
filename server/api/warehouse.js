module.exports = (router, Visitor, DataCache, config) => {
    const jwt = require('jsonwebtoken');
    const signOptions = { expiresIn: "14 days" };

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
    router.post("/warehouseAuth", (req, res) => {
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

    router.get("/nextVisitor", verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, async (err, authData) => {
            if (err) {
                console.log(err)
                res.sendStatus(403);
            } else {
                try {
                    const nextVisitor = await DataCache.getWaitingList(1);
                    nextVisitor.state_of_production = 'in progress';
                    DataCache.updateVisitor(nextVisitor, 'status');
                    Visitor.update(
                        { state_of_production: nextVisitor.state_of_production },
                        { where: { user_hash_id: nextVisitor.id } }
                    );
                    res.json({ nextVisitor });
                } catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            }
        });
    });

    router.post("/updateProductionStatus", verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, async (err, authData) => {
            if (err) {
                console.log(err)
                res.sendStatus(403);
            } else {
                try {
                    let visitor = req.body.visitor;
                    visitor.state_of_production = req.body.status;
                    DataCache.updateVisitor(visitor, 'status');
                    Visitor.update(
                        { state_of_production: visitor.state_of_production },
                        { where: { user_hash_id: visitor.id } }
                    );
                    res.json({ nextVisitor });
                } catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }
            }
        });
    });

    return router;
};