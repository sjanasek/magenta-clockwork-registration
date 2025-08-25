import axios from 'axios';

const state = {
    token: {}
};

const getters = {};

const actions = {
    async fetchToken({ commit }, authData) {
        const payload = {
            user: authData.user,
            password: authData.password
        };
        try {
            const response = await axios.post('/api/auth',
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
            commit('setPopup', { bool: false, message: "" });
            commit('setToken', response.data);
            commit('setLoggedIn', response.data);
        } catch (err) {
            // eslint-disable-next-line
            console.warn(err);
            commit('setPopup', { bool: true, message: "Login nicht erfolgreich!" });
        }
    }
};

const mutations = {
    setToken: (state, token) => (state.token = token)
};

export default {
    state,
    getters,
    actions,
    mutations
};