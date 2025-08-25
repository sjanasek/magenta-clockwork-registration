module.exports = (router, Visitor, DataCache, config) => {
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
    router.post("/auth", (req, res) => {
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

    // Get unrated visitors
    router.get("/overview", verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const visitors = DataCache.getUnrated(15);
                res.json(visitors);
            }
        });
    });


    // Update rated visitor
    router.put("/update/:id", verifyToken, (req, res) => {
        jwt.verify(req.token, config.privateKey, signOptions, (err, authData) => {
            if (err) {
                console.log(err)
                res.sendStatus(403);
            } else {
                req.body.state_of_production = req.body.rating !== 'fake' ? 'pending' : 'order cancelled';
                DataCache.updateVisitor(req.body, "rating");

                Visitor.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    company: req.body.company,
                    job_title: req.body.job_title,
                    email: req.body.email,
                    phone: req.body.phone,
                    rating: req.body.rating,
                    visitor_picture_url: req.body.visitor_picture_url,
                    social_media_url: req.body.social_media_url,
                    state_of_production: req.body.state_of_production
                },
                    {
                        where: { user_hash_id: req.params.id }
                    })
                    .then(() => {
                        res.status(200).json({ response: 'visitor was updated!', authData });
                    })
                    .catch(err => {
                        res.send(`error: ${err}`);
                    });
            }
        });
    });
    return router;
};