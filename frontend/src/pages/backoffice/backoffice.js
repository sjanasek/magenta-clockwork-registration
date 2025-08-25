import Vue from 'vue';
// import root component
import Backoffice from './Backoffice.vue';
// import global backoffice state-storage
import store from './store/store';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(Backoffice),
}).$mount('#app');
