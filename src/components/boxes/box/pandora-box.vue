<template>
    <div v-if="box">

        <span>hash: {{ this.box.hash.toString('hex') }}</span>
        <span>name: {{ this.box.name }}</span>
        <span>description: {{ this.box.description }}</span>

        <span v-for="(stream, i) in streams"
              :key="`box_stream_${i}`">
            {{stream.path}}
            {{stream.type}}
            {{stream.size}} bytes
            {{stream.isDone}}
            {{stream.percent}} %
        </span>

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

        getStreams(){

            const out = [];
            for (let i=0; i < this.box.streams.length; i++) {
                const stream = this.box.streams[i];
                out.push( this.streamToInfoObject(stream) );
            }

            return out;
        },

        streamToInfoObject(stream){

            let percent;
            if (stream.type === 0){
                percent = (stream.chunksCount - stream.statusUndoneChunks.length) / (stream.chunksCount || 1) * 100;
            } else {
                percent = stream.isDone ? 100 : 0;
            }

            return {
                hash: stream.hash.toString('hex'),
                path: stream.path,
                type: stream.type,
                size: stream.size,
                isDone: stream.isDone,
                percent,
            }
        }

    },

    mounted(){

        this.streams = this.getStreams();
        this.percent = this.box.chunksTotalAvailable / (this.box.chunksTotal || 1) * 100;
        this.box.on('chunks/total-available', ({chunksTotalAvailable, chunksTotal} ) => {
            this.percent = chunksTotalAvailable / ( chunksTotal || 1) * 100;
        } )

        this.box.on('stream-chunk/done', ({stream})=>{

            for (let i=0; i < this.streams.length; i++)
                if (this.streams[i].path === stream.path)
                    Vue.set(this.streams, i, this.streamToInfoObject(stream) );
        })

        this.box.on('stream/done', ({stream}) => {

            for (let i=0; i < this.streams.length; i++)
                if (this.streams[i].path === stream.path)
                    Vue.set(this.streams, i, this.streamToInfoObject(stream) );

        });

    }

}
</script>

<style scoped>
    div,
    span{
        display:block;;
    }
</style>