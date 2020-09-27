<template>
    <div>
        <template v-if="loading">
            publishing...
        </template>
        <template v-else>

            <div class="vote-triangle upvote" @click="vote(true)"></div>
            <span class="sum">{{sum}}</span>
            <div class="vote-triangle downvote" @click="vote(false)"></div>
        </template>
    </div>
</template>

<script>
export default {

    data(){
        return {
            loading: false,
        }
    },

    props:{
        object: { default: null },
        type: { default: null },
    },

    computed:{
        sum(){
            return this.object.votesUp - this.object.votesDown;
        }
    },

    methods: {

        getSybilObject(){

            if (this.type === 'boxMeta') {

                let box = PANDORA_PROTOCOL_NODE.pandoraBoxes.boxesMap[ this.object.hash ];
                if (box && box.streamliner) return box.streamliner.pandoraBoxMeta;

                if (global.FIND_RESULTS) {
                    const boxMeta = global.FIND_RESULTS[this.object.hash];
                    if (boxMeta) return boxMeta;
                }

            }

        },

        async vote(vote){

            this.loading = true;
            try{

                const object = this.getSybilObject();
                if (!object) throw "Sybil Object couldn't be found";

                const out = await object.sybilProtectVoteSign(vote);

            }catch(err){
                 console.error(err);
            }finally{
                this.loading = false;
            }

        }

    },

}
</script>

<style scoped>

    .sum{
        position:absolute;
        margin-left: 4px;
        padding-top: 10px;
    }

    .vote-triangle{
        cursor: pointer;
    }

    .upvote {
        width: 0;
        height: 0;
        border-color: #CCCCFF;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #CCCCFF;
    }


    .downvote {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #CCCCFF;
        margin-left: -1px;
        margin-top: 33px;
    }

</style>