import Vue from "vue";
import VueRouter from "vue-router";
import Create from './components/Create.vue';
import Read from './components/Read.vue';
import Update from './components/Update.vue';
import Login from './components/Auth/Login.vue';
import Logout from './components/Auth/Logout.vue';
import Register from './components/Auth/Register.vue';

Vue.use(VueRouter)

// router
const routes = [
    {
        name: 'read',
        path: '/',
        component: Read,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: 'create',
        path: '/create',
        component: Create,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: 'update',
        path: '/detail/:id',
        component: Update,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        props: true,
        meta: {
            requiresVisitor: true,
          }
    },
    {
        name: 'logout',
        path: '/logout',
        component: Logout
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requiresVisitor: true,
        }
      },
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: "active",
    routes: routes
});

export default router;