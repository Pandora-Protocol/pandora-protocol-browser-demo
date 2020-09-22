import Vue from 'vue';

export default {

    setPandoraBoxStream(state, pandoraBoxStream) {

        const out = pandoraBoxStream.toJSON(true);
        out.hash = pandoraBoxStream.hashHex;
        out.isDone = pandoraBoxStream.isDone;
        out.percent = pandoraBoxStream.percent;

        Vue.set(state.list, pandoraBoxStream.hashHex, out );

    },

    setPandoraBoxStreamPercent(state, pandoraBoxStream){
        Vue.set(state.list[ pandoraBoxStream.hashHex ], 'percent', pandoraBoxStream.percent );
        Vue.set(state.list[ pandoraBoxStream.hashHex ], 'isDone', pandoraBoxStream.isDone );
    },

    removePandoraBoxStream(state, hashHex){
        Vue.delete(state.list, hashHex );
    }

}