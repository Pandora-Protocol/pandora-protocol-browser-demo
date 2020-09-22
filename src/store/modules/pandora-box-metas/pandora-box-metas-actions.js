export default {

    pandoraBoxMetasAdd({ state, commit, rootState }, {pandoraBoxMeta, stored} ) {
        commit('setPandoraBoxMeta', {pandoraBoxMeta, stored});
    },

    pandoraBoxMetasRemove({state, commit, dispatch, rootState}, {hashHex, includeStored} ) {

        if (state.list[hashHex] && (!state.list[hashHex].stored || includeStored))
            commit('removePandoraBoxMeta', hashHex);

    }

}