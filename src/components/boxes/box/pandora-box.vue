<template>
    <div v-if="box" class="box" style="margin:20px">

        <div>

            <vote class="vote" :hash="box.hash" />

            <div class="meta" >
                <div>
                    <span class="info">hash: <span class="bold">{{ this.box.hash }}</span></span>
                </div>
                <div>
                    <span class="info">name: {{ this.box.name }}</span>
                </div>
                <div>
                    <span class="info">description: {{ this.box.description }}</span>
                </div>
                <div>
                    <span class="info">size: {{this.box.size}}</span>
                </div>
                <div>
                    <span class="info">categories: {{this.box.categories.join(' --> ')}}</span>
                </div>
                <div>
                    <span class="info">score: {{this.box.score}}</span>
                </div>
            </div>

        </div>

        <div class="block" style="margin: 10px">
            <div v-for="(stream, i) in this.box.streams"
                 :key="`box_stream_${i}`">

                <span>{{stream.path}} </span>
                <span>{{stream.type}} </span>
                <span>{{stream.size}} bytes </span>

                <template v-if="pandoraBoxStreams[stream.hash] && stream.type === 0">
                    <span>{{pandoraBoxStreams[stream.hash].isDone}} </span>
                    <span class="bold">{{pandoraBoxStreams[stream.hash].percent}} % </span>

                    <span v-if="pandoraBoxStreams[stream.hash].percent === 100 " class="action" @click="saveStreamAs(stream.hash)"> >>> </span>
                </template>

            </div>

        </div>

        <div v-if="enableStreamliner">
            <span v-if="streamlineLoading">...loading</span>
            <span v-else @click="streamline" class="action"> >>>> </span>
        </div>

        Percent {{box.percent}} %
        <div v-if="box.percent === 100" @click="saveAs" class="action">
            >>>
        </div>

    </div>
</template>

<script>

import Vue from 'vue';
import Vote from "src/components/vote/vote"

export default {

    components: {Vote},

    props: {
        hash: null,
        enableStreamliner: false,
    },

    data(){
        return {
            streamlineLoading: false,
        }
    },

    computed:{

        box(){
            if (this.$store.state.pandoraBoxes.list[this.hash]) return this.$store.state.pandoraBoxes.list[this.hash];
            if (this.$store.state.pandoraBoxMetas.list[this.hash]) return this.$store.state.pandoraBoxMetas.list[this.hash];
            return null;
        },

        pandoraBoxStreams(){
            return this.$store.state.pandoraBoxStreams.list;
        },
    },

    methods:{

        async streamline(){

            this.streamlineLoading = true;

            this.status = '';

            try{
                const pandoraBox = await PANDORA_PROTOCOL_NODE.getPandoraBox( this.box.hash);
                console.log(pandoraBox);

                this.status = 'Success! ';

                this.streamlineLoading = false;
                this.$router.push('/boxes')

            }catch(err){
                this.status = 'Error';
                return console.log(err);
            }

        },

        async saveStreamAs(hash){
            const stream = PANDORA_PROTOCOL_NODE.pandoraBoxes.streamsMap[ hash ];
            const out = await PANDORA_PROTOCOL_NODE.locations.savePandoraBoxStreamAs( stream );
            console.log(out);
        },

        async saveAs(){
            const box = PANDORA_PROTOCOL_NODE.pandoraBoxes.boxesMap[ this.box.hash ];
            const out = await PANDORA_PROTOCOL_NODE.locations.savePandoraBoxAs( box );
            console.log(out);
        },


    },

    mounted(){


    }

}
</script>

<style scoped>

    .vote{
        display: inline-block;
        vertical-align:top;
    }

    .meta{
        display: inline-block;
    }

</style>