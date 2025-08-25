import axios from 'axios';

const state = {
    user_hash_id: localStorage.user_hash_id || "",
    json: localStorage.json || "",
    showPicture: false,
    cookieInfo: localStorage.hasOwnProperty("cookieInfo") ? false : true,
    timeout: localStorage.timeout || 600000,
    languages: localStorage.languages || ['de', 'en']
};

const getters = {
    getID: state => state.user_hash_id,
    getJSON: state => state.json,
    showPicture: state => state.showPicture,
    getCookieInfo: state => state.cookieInfo,
    getTimeout: state => state.timeout,
    getLanguages: state => typeof state.languages === "string" ? state.languages.split(',') : state.languages
};

const actions = {
    async fetchID({ commit }) {
        try {
            const response = await axios.get('/api/assignUUID', {});
            commit("setID", response.data.user_hash_id);
            commit("setJSON", response.data.json);
            commit("setTimeout", response.data.timeout);
            commit("setLanguages", response.data.languages);
        } catch (err) {
            // eslint-disable-next-line
            console.warn(err);
        }
    },
    async fetchLanguage({ commit }, language) {
        const response = await axios.post('/api/language', { language });
        localStorage.json = JSON.stringify(response.data.json);
        commit('setJSON', response.data.json);
    },
    deserializeJSON({ commit }, json) {
        if (json !== "undefined") {
            commit("setJSON", JSON.parse(json));
        }
    },
    showPicture({ commit }, bool) {
        commit("toggleShowPicture", bool);
    },
    hideCookieBar({ commit }) {
        localStorage.cookieInfo = false
        commit("toggleCookieInfo");
    }
};

const mutations = {
    setID: (state, id) => state.user_hash_id = id,
    setJSON: (state, json) => state.json = json,
    toggleShowPicture: (state, bool) => state.showPicture = bool,
    toggleCookieInfo: state => state.cookieInfo = false,
    setTimeout: (state, timeout) => { state.timeout = timeout; localStorage.timeout = timeout; },
    setLanguages: (state, languages) => { state.languages = languages; localStorage.languages = languages; }
};

export default {
    state,
    getters,
    actions,
    mutations
};