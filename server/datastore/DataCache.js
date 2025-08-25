// jshint maxerr:1000
module.exports = async db => {
    const Visitor = db.Visitor;
    const Product = db.Product;
    const Reserved = db.Reserved;
    const Op = db.Sequelize.Op;

    class DataCache {
        constructor() {
            this._unrated = [];
            this._salesList = {
                hot: [],
                warm: [],
                cold: [],
                unknown: [],
                inProgress: [],
                done: []
            };
            this._waitingList = [];
            this._visitors;
            this._products = [];
            this._reserved = [];
        }
        async _loadData() {
            try {
                const unratedVisitors = await Visitor.findAll({
                    where: {
                        rating: "not rated yet"
                    }
                });
                this._unrated = JSON.parse(JSON.stringify(unratedVisitors));

                const otherVisitors = await Visitor.findAll({
                    where: {
                        [Op.not]: {
                            rating: "not rated yet"
                        }
                    }
                });
                this._unrated = JSON.parse(JSON.stringify(unratedVisitors));

                const hot = await Visitor.findAll({
                    where: {
                        rating: "hot",
                        [Op.and]: {
                            handled_by_sales: 'not yet'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });
                this._salesList.hot = JSON.parse(JSON.stringify(hot));

                const warm = await Visitor.findAll({
                    where: {
                        rating: "warm",
                        [Op.and]: {
                            handled_by_sales: 'not yet'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });
                this._salesList.warm = JSON.parse(JSON.stringify(warm));

                const cold = await Visitor.findAll({
                    where: {
                        rating: "cold",
                        [Op.and]: {
                            handled_by_sales: 'not yet'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });
                this._salesList.cold = JSON.parse(JSON.stringify(cold));

                const unknown = await Visitor.findAll({
                    where: {
                        rating: "unknown",
                        [Op.and]: {
                            handled_by_sales: 'not yet'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });
                this._salesList.unknown = JSON.parse(JSON.stringify(unknown));

                const done = await Visitor.findAll({
                    where: {
                        handled_by_sales: 'done'
                    }
                });
                this._salesList.done = JSON.parse(JSON.stringify(done));

                const fake = await Visitor.findAll({
                    where: {
                        rating: "fake"
                    },
                    order: [['time_of_registration', 'ASC']]
                });
                this._fake = JSON.parse(JSON.stringify(fake));

                const waitingHot = await Visitor.findAll({
                    attributes: ['user_hash_id', 'rating', 'parameter_speedLeft', 'parameter_speedRight', 'parameter_excenterLeft', 'parameter_excenterRight'],
                    where: {
                        rating: "hot",
                        [Op.and]: {
                            state_of_production: 'pending'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });

                const waitingWarm = await Visitor.findAll({
                    attributes: ['user_hash_id', 'rating', 'parameter_speedLeft', 'parameter_speedRight', 'parameter_excenterLeft', 'parameter_excenterRight'],
                    where: {
                        rating: "warm",
                        [Op.and]: {
                            state_of_production: 'pending'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });

                const waitingCold = await Visitor.findAll({
                    attributes: ['user_hash_id', 'rating', 'parameter_speedLeft', 'parameter_speedRight', 'parameter_excenterLeft', 'parameter_excenterRight'],
                    where: {
                        rating: "cold",
                        [Op.and]: {
                            state_of_production: 'pending'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });

                const waitingUnknown = await Visitor.findAll({
                    attributes: ['user_hash_id', 'rating', 'parameter_speedLeft', 'parameter_speedRight', 'parameter_excenterLeft', 'parameter_excenterRight'],
                    where: {
                        rating: "unknown",
                        [Op.and]: {
                            state_of_production: 'pending'
                        }
                    },
                    order: [['time_of_registration', 'ASC']]
                });

                this._waitingList = [...waitingHot, ...waitingWarm, ...waitingCold, ...waitingUnknown];

                this._visitors = new Map([...unratedVisitors, ...otherVisitors].map(visitor => [visitor.user_hash_id, visitor]));

                const products = await Product.findAll({});
                this._products = JSON.parse(JSON.stringify(products));

                const reserved = await Reserved.findAll({});
                this._reserved = JSON.parse(JSON.stringify(reserved));
            } catch (err) {
                console.log(err);
            }
        }
        async queryVisitors(id) {
            try {
                return this._visitors && this._visitors.has(id) ? this._visitors.get(id) : null;
            } catch (err) {
                console.log(err);
            }
        }
        async queryProducts(query) {
            return this._products.filter(product => product[query.subject] == query.value);
        }
        async updateVisitor(visitor, type) {
            switch (type) {
                case "rating":
                    let unratedIndex = this._unrated.findIndex(visitors => visitors.user_hash_id == visitor.user_hash_id);
                    if (~unratedIndex) {
                        this._unrated.splice(unratedIndex, 1);
                        if (visitor.rating !== 'fake') {
                            this._salesList[visitor.rating].push(visitor);
                            const length = this._waitingList.length;
                            let waitingIndex = this._waitingList.findIndex((waiting, index) => (length > 3 && ![0, 1, 2].includes(index) && waiting.rating !== visitor.rating));
                            if (waitingIndex == -1) {
                                this._waitingList.unshift({
                                    user_hash_id: visitor.user_hash_id,
                                    rating: visitor.rating,
                                    parameter_speedLeft: visitor.parameter_speedLeft,
                                    parameter_speedRight: visitor.parameter_speedRight,
                                    parameter_excenterLeft: visitor.parameter_excenterLeft,
                                    parameter_excenterRight: visitor.parameter_excenterRight
                                });
                            } else {
                                this._waitingList.splice(waitingIndex, 0, {
                                    user_hash_id: visitor.user_hash_id,
                                    rating: visitor.rating,
                                    parameter_speedLeft: visitor.parameter_speedLeft,
                                    parameter_speedRight: visitor.parameter_speedRight,
                                    parameter_excenterLeft: visitor.parameter_excenterLeft,
                                    parameter_excenterRight: visitor.parameter_excenterRight
                                });
                            }
                        }
                        this._visitors.set(visitor.user_hash_id, visitor);
                    }
                    break;
                case "sales":
                    if (visitor.handled_by_sales === 'not yet') {
                        this._salesList[visitor.rating].push(visitor);
                    } else if (visitor.handled_by_sales === 'done') {
                        let inProgressIndex = this._salesList.inProgress.findIndex(visitors => visitors.user_hash_id == visitor.user_hash_id);
                        this._salesList.inProgress.splice(inProgressIndex, 1);
                        let doneIndex = this._salesList.done.findIndex(visitors => visitors.user_hash_id == visitor.user_hash_id);
                        if (~doneIndex) {
                            this._salesList.done[doneIndex] = visitor;
                        } else { 
                            this._salesList.done.push(visitor);
                        }
                    } else {
                        let salesIndex = this._salesList[visitor.rating].findIndex(visitors => visitors.user_hash_id == visitor.user_hash_id);
                        this._salesList[visitor.rating].splice(salesIndex, 1);
                        this._salesList.inProgress.push(visitor);
                    }
                    this._visitors.set(visitor.user_hash_id, visitor);
                    break;
                case "status":
                    let salesIndex = this._salesList[visitor.rating].findIndex(visitors => visitors.user_hash_id == visitor.user_hash_id);
                    let updatedVisitor = this._visitors.get(visitor.user_hash_id);
                    updatedVisitor.state_of_production = visitor.state_of_production;
                    this._salesList[visitor.rating].splice(salesIndex, 1, updatedVisitor);
                    this._visitors.set(visitor.user_hash_id, updatedVisitor);
                    break;
                default:
                    this._unrated.push(visitor);
                    this._visitors.set(visitor.user_hash_id, visitor);
                    let productIndex = this._products.findIndex(product => product.product_id == visitor.product_type);
                    if (~productIndex) {
                        this._products[productIndex].stock--;
                    }
            }
        }
        updateProducts(id, subject, increment) {
            this._products.forEach((product) => {
                if (product.product_id == id) {
                    product[subject] += increment ? 1 : -1;
                }
            });
        }
        async updateReservations(reservationTime, newReservation) {
            const deleted = [];
            this._reserved = this._reserved.filter(reservation => {
                const reservationTimeStamp = new Date(reservation.time_of_reservation).getTime();
                if ((new Date().getTime() - reservationTimeStamp) < reservationTime) {
                    return true;
                } else {
                    deleted.push(reservation.reserved_hash_id);
                    return false;
                }
            });
            if (newReservation) {
                this._reserved.push(newReservation);
            }
            return deleted;
        }
        getUnrated(amount) {
            return this._unrated.slice(0, amount);
        }
        async getSalesList() {
            return this._salesList;
        }
        async getWaitingList(amount) {
            return this._waitingList.splice(0, amount);
        }
        async getProducts() {
            return this._products;
        }
        getReserved(product) {
            return this._reserved.filter(reservation => reservation.reserved_product == product).length;
        }
    }

    const instance = new DataCache;

    await instance._loadData();

    return instance;
};