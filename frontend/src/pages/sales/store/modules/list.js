import axios from 'axios';

const state = {
    list: {
        hot: [],
        warm: [],
        cold: [],
        unknown: [],
        inProgress: [],
        done: [],
    },
    config: {},
    products: {},
    pictograms: {}
};

const getters = {
    getList: state => state.list,
    getConfig: state => state.config,
    getProducts: state => state.products,
    getPictograms: state => state.pictograms
};

const actions = {
    async fetchConfig({ commit }) {
        const token = sessionStorage.getItem("token");
        const bearerHeader = "Bearer " + token;
        try {
            const response = await axios.get('/api/salesConfig',
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        "Authorization": bearerHeader
                    }
                });
            const products = response.data.productNames;
            const config = response.data.salesConfig;
            const pictograms = response.data.pictograms;
            commit('setProducts', products);
            commit('setConfig', config);
            commit('setPictograms', pictograms);
        } catch (err) {
            // eslint-disable-next-line
            console.log('Error: ', err);
        }
    },
    async fetchList({ commit }) {
        const token = sessionStorage.getItem("token");
        const bearerHeader = "Bearer " + token;
        try {
            const response = await axios.get('/api/salesList',
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        "Authorization": bearerHeader
                    }
                });
            let visitors = response.data;
            commit('setLists', visitors);
        } catch (err) {
            // eslint-disable-next-line
            console.log('Error: ', err);
        }
    }
};

const mutations = {
    setConfig: (state, config) => state.config = config,
    setLists: (state, payload) => state.list = payload,
    setList: (state, payload) => state.list[Object.keys(payload)[0]] = payload[Object.keys(payload)[0]],
    setProducts: (state, products) => state.products = products,
    setPictograms: (state, pictograms) => state.pictograms = pictograms
};

export default {
    state,
    getters,
    actions,
    mutations
};