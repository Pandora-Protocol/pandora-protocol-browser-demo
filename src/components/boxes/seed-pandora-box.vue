<template>
    <div>

        Seed Pandora Box
        <input type="file" webkitdirectory mozdirectory msdirectory odirectory directory multiple @change="changed" />

        <textarea type="text" rows="8" cols="50" v-model="streamsText" />

        <input type="text" v-model="name" />

        <button @click="click">seed box</button>

    </div>
</template>

<script>
export default {

    data(){
        return {
            name:'browser demo box',
            streams: [],
            streamsMap: {},
        }
    },

    computed:{
        streamsText(){

            let out = '';
            for (const stream of this.streams){
                const s =  stream.path+'   '+ stream.size;
                out += s + '\n';
            }

            return out;

        }
    },

    methods: {

        reset(){
            this.streams = [];
            this.streamsMap = {};
        },

        changed(e){

            for (const stream of e.target.files){

                const path = stream.webkitRelativePath;

                if (!this.streamsMap[path]) {
                    this.streams.push({
                        stream: stream,
                        path: stream.webkitRelativePath,
                        size: stream.size,
                    })
                    this.streamsMap[path] = true;
                }

            }

        },

        click(){

            PANDORA_PROTOCOL_NODE.seedPandoraBox( this.streams, this.name, '', undefined, (err, out)=>{

                console.log(err, out);
                if (out.pandoraBox){
                    this.reset()
                }

            } )

        }
    }

}
</script>