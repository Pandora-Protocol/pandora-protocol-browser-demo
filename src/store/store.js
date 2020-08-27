import Vuex from 'vuex';
import GlobalStoreModule from "./modules/global-module/global-store-module"
import PandoraProtocolStoreModule from "./modules/pandora-protocol-module/pandora-protocol-module"

import Vue from "vue";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global: GlobalStoreModule,
        pandoraProtocol: PandoraProtocolStoreModule,
    }
})