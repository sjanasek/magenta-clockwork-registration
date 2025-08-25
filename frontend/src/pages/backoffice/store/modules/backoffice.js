const state = {
    token: '',
    loggedIn: sessionStorage.getItem("token") ?  true : false,
    detail: false,
    popup: { bool: false, message: "" }
};

const getters = {
    getState: state => state,
    getToken: state => state.token,
    getPopup: state => state.popup
};

const actions = {
    async togglePopup({ commit }, obj) {
        commit('setPopup', obj);
    },
    async logout({commit}) {
        commit('showLogin');
    }
};

const mutations = {
    setLoggedIn: (state, token) => {
        sessionStorage.setItem("token", token.token);
        state.token = token.token;
        state.loggedIn = true;
    },
    showDetail: state => state.detail = true,
    showList: state => state.detail = false,
    showLogin: state => state.loggedIn = false,
    setPopup: (state, obj) => { state.popup.bool = obj.bool; state.popup.message = obj.message }
};

export default {
    state,
    getters,
    actions,
    mutations
};