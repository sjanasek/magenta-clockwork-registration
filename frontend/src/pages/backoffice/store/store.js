import Vuex from 'vuex';
import Vue from 'vue';
import backoffice from './modules/backoffice';
import login from './modules/login';
import listView from './modules/listView';
import details from './modules/details';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        backoffice,
        login,
        listView,
        details
    }
});