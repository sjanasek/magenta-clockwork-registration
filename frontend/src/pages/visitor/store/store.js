import Vuex from 'vuex';
import Vue from 'vue';
import visitor from './modules/visitor';
import choosePicture from './modules/choosePicture';
import chooseProduct from './modules/chooseProduct';
import enterData from './modules/enterData';
import status from './modules/status';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        visitor,
        choosePicture,
        chooseProduct,
        enterData,
        status
    }
});