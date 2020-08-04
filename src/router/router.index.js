import VueRouter from "vue-router"
import Vue from "vue";

import Bootstrap from "../components/bootstrap/bootstrap"
import PandoraBoxes from "../components/boxes/pandora-boxes"
import Find from "../components/find/find"

Vue.use(VueRouter);

const routes = [

    {path: '/', component: Bootstrap },
    {path: '/bootstrap', component: Bootstrap },

    {path: '/boxes', component: PandoraBoxes },
    {path: '/find', component: Find },

];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

export default router;