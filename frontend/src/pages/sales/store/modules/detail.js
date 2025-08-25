import axios from 'axios';

const state = {
    visitor: {},
    unchangedVisitor: {}
};

const getters = {
    getVisitor: state => state.visitor,
    getUnchangedVisitor: state => state.unchangedVisitor
};

const actions = {
    // eslint-disable-next-line
    async changeStatus({ commit }, visitor) {
        const token = sessionStorage.getItem("token");
        const bearerHeader = "Bearer " + token;
        try {
            await axios.get('/api/salesStatus',
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        "Authorization": bearerHeader
                    },
                    params: { visitor }
                });
        } catch (err) {
            // eslint-disable-next-line
            console.log('Error: ', err);
        }
    },
    setVisitor({ commit }, visitor) {
        commit("initVisitor", visitor);
    },
    updateVisitor({ commit }, data) {
        commit('mutateVisitor', data);
    }
};

const mutations = {
    initVisitor: (state, visitor) => { state.visitor = visitor; state.unchangedVisitor = visitor; },
    mutateVisitor: (state, input) => state.visitor[Object.keys(input)[0]] = input[Object.keys(input)[0]]
};

export default {
    state,
    getters,
    actions,
    mutations
};