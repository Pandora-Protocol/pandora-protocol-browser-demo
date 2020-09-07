<template>
    <div v-if="box" class="box" style="margin:20px">

        <div classs="block" >
            <div>
                <span class="info">hash: <span class="bold">{{ this.box.hash.toString('hex') }}</span></span>
            </div>
            <div>
                <span class="info">name: {{ this.box.name }}</span>
            </div>
            <div>
                <span class="info">description: {{ this.box.description }}</span>
            </div>
        </div>

        <div class="block" style="margin: 10px">
            <div v-for="(stream, i) in streams"
                 :key="`box_stream_${i}`">

                <span>{{stream.path}} </span>
                <span>{{stream.type}} </span>
                <span>{{stream.size}} bytes </span>
                <span>{{stream.isDone}} </span>
                <span class="bold">{{stream.percent}} % </span>

                <span v-if="stream.percent === 100 && stream.type === 0" class="action" @click="saveStreamAs(i)"> >>> </span>
            </div>

        </div>

        <div v-if="enableStreamliner">
            <span v-if="streamlineLoading">...loading</span>
            <span v-else @click="streamline" class="action"> >>>> </span>
        </div>

        Percent {{percent}} %
        <div v-if="percent === 100" @click="saveAs" class="action">
            >>>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
export default {

    props: {
        box: null,
        enableStreamliner: false,
    },

    data(){
        return {
            percent: 0,
            streamlineLoading: false,
            streams: [],
        }
    },

    computed:{


    },

    methods:{

        streamline(){

            this.streamlineLoading = true;

            PANDORA_PROTOCOL_NODE.getPandoraBox( this.box.hash, (err, pandoraBox )=> {

                if (err) {
                    this.status = 'Error';
                    return console.log(err);
                }

                this.status = 'Success! ';
                console.log(this.box);

                this.streamlineLoading = false;
                this.$router.push('/boxes')

            });

        },

        getPandoraBoxStreams(){

            const out = [];
            for (let i=0; i < this.box.streams.length; i++) {
                const stream = this.box.streams[i];
                out.push( this.streamToInfoObject(stream) );
            }

            return out;
        },

        streamToInfoObject(stream){

            return {
                hash: stream.hash.toString('hex'),
                path: stream.path,
                type: stream.type,
                size: stream.size,
                isDone: stream.isDone,
                percent: stream.percent,
            }
        },

        saveStreamAs(index){
            PANDORA_PROTOCOL_NODE.locations.savePandoraBoxStreamAs( this.box.streams[index], undefined, (err, out) => {

                console.log(err, out);

            });
        },

        saveAs(){
            PANDORA_PROTOCOL_NODE.locations.savePandoraBoxAs( this.box, undefined, (err, out) => {

                console.log(err, out);

            });
        },

        refreshStream(stream){

            for (let i=0; i < this.streams.length; i++)
                if (this.streams[i].path === stream.path)
                    Vue.set(this.streams, i, this.streamToInfoObject(stream) );

        }

    },

    mounted(){

        this.streams = this.getPandoraBoxStreams();

        this.percent = this.box.percent;
        this.box.on('chunks/total-available', ( ) => {
            this.percent = this.box.percent;
        } )

        this.box.on('stream-chunk/done', ({stream})=>{
            this.refreshStream(stream);
        })

        this.box.on('stream/done', ({stream}) => {
            this.refreshStream(stream);
        });

    }

}
</script>

<style scoped>


</style>