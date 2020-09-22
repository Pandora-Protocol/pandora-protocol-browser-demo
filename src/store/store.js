import Vuex from 'vuex';
import GlobalStoreModule from "./modules/global-module/global-store-module"
import PandoraProtocolStoreModule from "./modules/pandora-protocol-module/pandora-protocol-module"
import PandoraBoxesStoreModule from "./modules/pandora-boxes/pandora-boxes-module"
import PandoraBoxStreamsStoreModule from "./modules/pandora-box-streams/pandora-box-streams-module"
import PandoraBoxMetasStoreModule from "./modules/pandora-box-metas/pandora-box-metas-module"

import Vue from "vue";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global: GlobalStoreModule,
        pandoraProtocol: PandoraProtocolStoreModule,
        pandoraBoxes: PandoraBoxesStoreModule,
        pandoraBoxStreams: PandoraBoxStreamsStoreModule,
        pandoraBoxMetas: PandoraBoxMetasStoreModule,
    }
})