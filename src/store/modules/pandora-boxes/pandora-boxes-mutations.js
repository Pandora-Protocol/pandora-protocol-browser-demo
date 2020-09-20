import Vue from 'vue';

export default {

    setPandoraBox(state, pandoraBox) {

        const out = pandoraBox.toJSON(true);
        out.hash = pandoraBox.hashHex;
        out.isDone = pandoraBox.isDone;
        out.percent = pandoraBox.percent;

        Vue.set(state.list, pandoraBox.hashHex, out );
    },


    setPandoraBoxPercent(state, pandoraBox ){
        Vue.set(state.list[ pandoraBox.hashHex ], 'percent', pandoraBox.percent );
        Vue.set(state.list[ pandoraBox.hashHex ], 'isDone', pandoraBox.isDone );
    },

    removePandoraBox(state, pandoraBox){
        Vue.delete(state.list, pandoraBox.hashHex );
    }

}