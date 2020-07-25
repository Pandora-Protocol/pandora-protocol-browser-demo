<template>
    <div>

        Seed Pandora Box
        <input type="file" webkitdirectory mozdirectory msdirectory odirectory directory multiple @change="changed" />

        <textarea type="text" rows="8" cols="50" v-model="streamsText" />
        <button @click="click">seed box</button>

    </div>
</template>

<script>
export default {

    data(){
        return {
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

        changed(e){

            const files = e.target.files;
            for (let i=0; i < files.length; i++ ){
                const file = files[i];

                const path = file.webkitRelativePath;

                if (!this.streamsMap[path]) {
                    this.streams.push({
                        stream: file,
                        path: file.webkitRelativePath,
                        size: file.size,
                    })
                    this.streamsMap[path] = true;
                }
            }

        },

        click(){

        }
    }

}
</script>