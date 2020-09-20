export default {

    pandoraBoxStreamAdd({ state, commit, rootState }, pandoraBoxStream ) {
        commit('setPandoraBoxStream', pandoraBoxStream);
    },

    pandoraBoxStreamUpdate({state, commit, rootState}, pandoraBoxStream){
        commit('setPandoraBoxStreamPercent', pandoraBoxStream)
    }

}