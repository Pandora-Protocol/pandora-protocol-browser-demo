import Vue from "vue";

export default {

    pandoraBoxesAdd({ state, commit, dispatch, rootState }, pandoraBox ) {
        commit('setPandoraBox', pandoraBox);

        for (const stream of pandoraBox.streams)
            dispatch('pandoraBoxStreamAdd', stream )

    },

    pandoraBoxesUpdatePercent({ state, commit, dispatch, rootState }, pandoraBox ) {
        commit('setPandoraBoxPercent', pandoraBox);
    },

}