import Vue from "vue";

export default {

    pandoraBoxMetasAdd({ state, commit, rootState }, {pandoraBoxMeta, stored} ) {
        commit('setPandoraBoxMeta', {pandoraBoxMeta, stored});
    },

    pandoraBoxMetasRemove({state, commit, dispatch, rootState}, {hashHex, includeStored} ) {

        if (state.list[hashHex] && (!state.list[hashHex].stored || includeStored))
            commit('removePandoraBoxMeta', hashHex);

    },

    pandoraBoxMetasUpdate({ state, commit, dispatch, rootState }, pandoraBoxMeta ) {
        commit('setPandoraBoxUpdate', pandoraBoxMeta );
    },

    pandoraBoxMetasCrawlerStoringCountOperationsUpdate({state, commit},data ){
        commit('setPandoraBoxUpdateCrawlerStoringCountOperations', data );
    },

    pandoraBoxMetasCrawlerStoringOperationsIndexUpdate({ state, commit, dispatch, rootState }, data ) {
        commit('setPandoraBoxUpdateCrawlerStoringOperationsIndex', data );
    },

}