export default {

    pandoraBoxStreamsAdd({ state, commit, rootState }, pandoraBoxStream ) {
        commit('setPandoraBoxStream', pandoraBoxStream);
    },

    pandoraBoxStreamsUpdate({state, commit, rootState}, pandoraBoxStream){
        commit('setPandoraBoxStreamPercent', pandoraBoxStream)
    },

    pandoraBoxStreamsRemove({state, commit, rootState}, hashHex ){
        commit('removePandoraBoxStream', hashHex)
    }

}