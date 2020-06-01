require('./bootstrap');

import Vue from "vue";
import App from './components/App.vue';
import router from './router';
import store from './store';

// new Vue(Vue.util.extend({
//     router,
//     store
// }, App))
// .$mount('#app');

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loggedIn) {
        next({
          name: 'login',
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.loggedIn) {
        next({
          name: 'read',
        })
      } else {
        next()
      }
    } else {
      next()
    }
})

const app = new Vue({
    el: "#app",

    router: router,
    store,

    render: h => h(App)
});

