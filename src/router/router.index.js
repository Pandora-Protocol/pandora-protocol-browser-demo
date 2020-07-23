import VueRouter from "vue-router"
import Vue from "vue";

import Dashboard from "../components/dashboard"
import Dashboard2 from "../components/dashboard2"

Vue.use(VueRouter);


const routes = [

    {path: '/', component: Dashboard },
    {path: '/2', component: Dashboard2 },

];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

export default router;