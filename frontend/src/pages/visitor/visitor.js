import Vue from 'vue';
import Visitor from './Visitor.vue';
import store from './store/store';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false;
Vue.use(VModal, { dialog: true });

new Vue({
  store,
  render: h => h(Visitor),
}).$mount('#app');
