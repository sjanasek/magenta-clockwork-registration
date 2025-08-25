import Vue from 'vue';
import Sales from './Sales.vue';
import store from './store/store';
import Router from 'vue-router';
import VModal from 'vue-js-modal';
import LoginView from './components/LoginView';
import ListView from './components/ListView';
import DetailView from './components/DetailView';
import VueRouter from 'vue-router';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.config.productionTip = false;
Vue.use(VModal, { dialog: true });
Vue.use(Router);
Vue.use(Vue2TouchEvents);

const routes = [
  { path: '/sales/detail/:id', component: DetailView, meta:{conditionalRoute:true} },
  { path: '/sales/list/:tab', component: ListView, meta:{conditionalRoute:true} },
  { path: '/sales/list', component: ListView, meta:{conditionalRoute:true} },
  { path: '/sales', component: LoginView },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.conditionalRoute)) { 
      if (!sessionStorage.getItem("token")) { 
          next({ path: '/sales'});
      } else { 
          next(); 
      } 
  } else { 
      next(); 
  } 
});

new Vue({
  store,
  router,
  render: h => h(Sales),
}).$mount('#app');
