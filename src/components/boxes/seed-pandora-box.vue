<template>
    <div>

        <h3>Seed Pandora Box</h3>

        <div class="block">
            <span>Select</span>
            <input  type="file" webkitdirectory mozdirectory msdirectory odirectory directory multiple @change="changed" />
        </div>

        <div class="block">
            <textarea type="text" rows="8" cols="50">
                {{streamsText}}
            </textarea>
        </div>

        <div class="block">
            <input  type="text" v-model="name" />
            <span v-if="loading">...processing</span>
            <button v-else @click="click">seed box</button>
        </div>

        {{status}}

    </div>
</template>

<script>
export default {

    data(){
        return {
            loading: false,

            status: '',

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

            this.status = '';

            this.loading = true;
            PANDORA_PROTOCOL_NODE.seedPandoraBox( this.streams, this.name, '', undefined, ()=> {

            }, (err, out)=>{

                console.log(err, out);

                this.loading = false;

                if (err)
                    this.status = err;
                else
                    this.status = 'Success! ' + out.pandoraBox.hashHex;

                if (out && out.pandoraBox)
                    this.reset()


            } )

        }
    }

}
</script>