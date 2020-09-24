import Vue from 'vue';

export default {

    setPandoraBoxMeta(state, {pandoraBoxMeta, stored} ) {

        const out = pandoraBoxMeta.toJSON(true);
        out.hash = pandoraBoxMeta.hashHex;

        out.score = pandoraBoxMeta.getScore();

        const votes = pandoraBoxMeta.getVotes();

        out.votesUp = votes.votesUp;
        out.votesDown = votes.votesDown;
        out.votesTotal = votes.votesTotal;

        out.stored = stored;

        Vue.set(state.list, pandoraBoxMeta.hashHex, out );
    },

    setPandoraBoxUpdate(state, pandoraBoxMeta ){

        Vue.set(state.list[pandoraBoxMeta.hashHex], 'score', pandoraBoxMeta.getScore() );

        const votes = pandoraBoxMeta.getVotes();

        Vue.set(state.list[pandoraBoxMeta.hashHex], 'votesUp', votes.votesUp );
        Vue.set(state.list[pandoraBoxMeta.hashHex], 'votesDown', votes.votesDown );
        Vue.set(state.list[pandoraBoxMeta.hashHex], 'votesTotal', votes.votesTotal );
    },

    removePandoraBoxMeta(state, { hashHex } ){
        Vue.delete(state.list, hashHex );
    }

}