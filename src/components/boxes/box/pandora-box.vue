<template>
    <div v-if="box" class="box">

        <span class="info">hash: {{ this.box.hash.toString('hex') }}</span>
        <span class="info">name: {{ this.box.name }}</span>
        <span class="info">description: {{ this.box.description }}</span>

        <div v-for="(stream, i) in streams" class="streams"
              :key="`box_stream_${i}`">
            <span>{{stream.path}} </span>
            <span>{{stream.type}} </span>
            <span>{{stream.size}} bytes </span>
            <span>{{stream.isDone}} </span>
            <span>{{stream.percent}} % </span>
            <span v-if="stream.percent === 100 && stream.type === 0" style="cursor: pointer" @click="saveAs(i)"> > </span>
        </div>

        <span v-if="enableStreamliner" @click="streamline" style="cursor: pointer" > >>>> </span>

        Percent {{percent}} %

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
            streams: [],
        }
    },

    computed:{


    },

    methods:{

        streamline(){

            PANDORA_PROTOCOL_NODE.getPandoraBox( this.box.hash, (err, pandoraBox )=> {

                if (err) {
                    this.status = 'Error';
                    return console.log(err);
                }

                this.status = 'Success! ';
                console.log(this.box);

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

        saveAs(index){
            PANDORA_PROTOCOL_NODE.locations.savePandoraBoxStreamAs( this.box.streams[index], undefined, (err, out) => {

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
    .box,
    .info{
        display:block;;
    }


</style>