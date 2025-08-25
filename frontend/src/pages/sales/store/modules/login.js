import axios from 'axios';

const state = {
    token: {},
    loggedIn: false
};

const getters = {
    getToken: state => state.token,
    getLoggedIn: state => state.loggedIn
};

const actions = {
    async fetchToken({ commit }, authData) {
        const payload = {
            user: authData.user,
            password: authData.password
        };
        const response = await axios.post('/api/salesAuth', {
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        commit('setToken', response.data.token);
        commit('setLoggedIn', true);
    }
};

const mutations = {
    setToken: (state, token) => (state.token = token),
    setLoggedIn: (state, bool) => state.loggedIn = bool
};

export default {
    state,
    getters,
    actions,
    mutations
};