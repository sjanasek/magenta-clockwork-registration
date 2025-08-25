import Vuex from 'vuex';
import Vue from 'vue';
import login from './modules/login';
import list from './modules/list';
import detail from './modules/detail';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        list,
        detail
    }
});