import axios from 'axios';

const state = {
    list: {}
};

const getters = {
    getList: state => {
        if (Array.isArray(state.list)) {
            const completeList = state.list.filter(listElement => {
                return listElement.business_card === null;
            });
            const tenElements = completeList.slice(0, 10);
            return tenElements;
        }
    },
    getBusinessCards: state => {
        if (Array.isArray(state.list)) {
            const allCards = state.list.filter(listElement => {
                return listElement.business_card !== null;
            });
            const twoCards = allCards.slice(0, 2);
            return twoCards;
        }
    }
};

const actions = {
    async fetchList({ commit }) {
        const token = sessionStorage.getItem("token");
        const bearerHeader = "Bearer " + token;
        try {
            const response = await axios.get('/api/overview',
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        "Authorization": bearerHeader
                    }
                });
            //response.data.visitor for sequelize requests
            let visitors = response.data;
            commit('setList', visitors);
            commit('showList');
        } catch (err) {
            // eslint-disable-next-line
            console.log('Error: ', err);
        }
    },
    setDetail({ commit }, visitor) {
        commit('showDetail');
        commit('setVisitor', visitor);
    }
};

const mutations = {
    setList: (state, list) => (state.list = list)
};

export default {
    state,
    getters,
    actions,
    mutations
};