// Import Vue
import Vue from 'vue';

// Import Vue App, routes, store
import App from './app';

import router from "./router/router.index"
import store from "./store/store"

export default (params)=> {

    const app = new Vue({
        el: '#app',
        router,
        store,
        render: (createElement) => {

            const app = createElement(App, {
                props: {
                }
            });

            return app;

        }
    }).$mount('#app');

    window.PandoraProtocolApp = app;

}