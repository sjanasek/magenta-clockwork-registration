import axios from 'axios';

const state = {
    availableProducts: [],
    productInfo: localStorage.productInfo || {
        productDone: false,
        reservation: {}
    },
};

const getters = {
    getAvailableProducts: state => state.availableProducts,
    getProductInfo: state => typeof state.productInfo === 'string' ? JSON.parse(state.productInfo) : state.productInfo
};

const actions = {
    async fetchProducts({ commit }) {
        const response = await axios.get('/api/availableProducts', {});
        commit("setAvailableProducts", response.data);
    },
    async reserveProduct({ commit }, payload) {
        try {
            fetch('/api/makeReservation', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({ reservation: payload })
            })
                .then(response => response.json())
                // eslint-disable-next-line
                .then(response => {
                    commit('setReservation', payload);
                })
                // eslint-disable-next-line
                .catch(err => console.error(err));

            commit('setReservation', payload);
        } catch (err) {
            // eslint-disable-next-line
            console.error(err);
        }
    },
    toggleProductDone({ commit }, bool) {
        commit("setProductDone", bool);
    },
    resetProductInfo({ commit }) {
        commit("setProductInfo");
    }
};

const mutations = {
    setAvailableProducts: (state, products) => state.availableProducts = products,
    setReservation: (state, reservation) => state.productInfo.reservation = reservation,
    setProductDone: (state, bool) => state.productInfo.productDone = bool,
    setProductInfo: state => state.productInfo = { productDone: false, reservation: {} }
};

export default {
    state,
    getters,
    actions,
    mutations
};