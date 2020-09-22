import Vue from "vue";

export default {

    pandoraBoxesAdd({ state, commit, dispatch, rootState }, {pandoraBox, stored} ) {

        commit('setPandoraBox', {pandoraBox, stored});

        for (const stream of pandoraBox.streams)
            dispatch('pandoraBoxStreamsAdd', stream )

        return dispatch('pandoraBoxMetasAdd', {pandoraBoxMeta: pandoraBox.streamliner.pandoraBoxMeta, stored});

    },

    pandoraBoxesUpdatePercent({ state, commit, dispatch, rootState }, pandoraBox ) {
        commit('setPandoraBoxPercent', pandoraBox);
    },

    pandoraBoxRemove({state, commit, dispatch, rootState}, {hashHex, includeStored} ){

        if (state.list[hashHex] && ( !state.list[hashHex].stored || includeStored) ) {
            commit('removePandoraBox', hashHex);

            for (const stream of state.list[hashHex].streams)
                dispatch('pandoraBoxStreamsRemove', stream )

            dispatch('pandoraBoxMetasRemove', {hashHex, includeStored})
        }


    }

}