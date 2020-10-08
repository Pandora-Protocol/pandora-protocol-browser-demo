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
            <span v-if="loading">
                ...processing
            </span>
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

            hash: '',
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

        },

        pandoraBoxMeta(){
            return this.$store.state.pandoraBoxMetas.list[this.hash];
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

        async click(){

            this.status = '';

            this.loading = true;

            try{

                const out = await PANDORA_PROTOCOL_NODE.seedPandoraBox( this.streams, this.name, '', [], undefined, false );
                console.log(out);

                this.status = 'Success! ' + out.pandoraBox.hashHex;
                this.hash = out.pandoraBox.hashHex;

                await out.pandoraBox.streamliner.start('seed');
                this.loading = false;

            }catch(err){
                console.error(err);
                this.status = err;
                this.loading = false;
            }finally{
                this.loading = false;
            }

        }

    }

}
</script>