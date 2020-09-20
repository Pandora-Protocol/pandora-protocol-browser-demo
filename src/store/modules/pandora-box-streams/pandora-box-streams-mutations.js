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
        Vue.set(state.list[ pandoraBox.hashHex ], 'percent', pandoraBox.percent );
        Vue.set(state.list[ pandoraBox.hashHex ], 'isDone', pandoraBox.isDone );
    },

    removePandoraBoxStream(state, pandoraBoxStream){
        Vue.delete(state.list, pandoraBoxStream.hashHex );
    }

}