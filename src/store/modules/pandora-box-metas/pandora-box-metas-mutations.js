import Vue from 'vue';

export default {

    setPandoraBoxMeta(state, {pandoraBoxMeta, stored} ) {

        const out = pandoraBoxMeta.toJSON(true);
        out.hash = pandoraBoxMeta.hashHex;

        out.score = pandoraBoxMeta.getScore();

        const votes = pandoraBoxMeta.getVotes();

        out.upVotes = votes.upVotes;
        out.downVotes = votes.downVotes;
        out.totalVotes = votes.totalVotes;

        out.stored = stored;

        Vue.set(state.list, pandoraBoxMeta.hashHex, out );
    },

    removePandoraBoxMeta(state, { hashHex } ){
        Vue.delete(state.list, hashHex );
    }

}