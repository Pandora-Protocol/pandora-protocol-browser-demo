import Vue from 'vue';

export default {

    setPandoraBox(state, {pandoraBox, stored}) {

        const out = pandoraBox.toJSON(true);
        out.hash = pandoraBox.hashHex;
        out.isDone = pandoraBox.isDone;
        out.percent = pandoraBox.percent;

        out.stored = stored;

        for (let i=0; i < pandoraBox.streams.length; i++)
            out.streams[i].hash = pandoraBox.streams[i].hashHex;

        Vue.set(state.list, pandoraBox.hashHex, out );
    },


    setPandoraBoxPercent(state, pandoraBox ){
        Vue.set(state.list[ pandoraBox.hashHex ], 'percent', pandoraBox.percent );
        Vue.set(state.list[ pandoraBox.hashHex ], 'isDone', pandoraBox.isDone );
    },

    removePandoraBox(state, { hashHex } ){
        Vue.delete(state.list, hashHex );
    }

}