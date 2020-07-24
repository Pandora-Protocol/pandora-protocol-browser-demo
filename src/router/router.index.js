import VueRouter from "vue-router"
import Vue from "vue";

import Dashboard from "../components/dashboard"

Vue.use(VueRouter);

const routes = [

    {path: '/', component: Dashboard },

];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

export default router;