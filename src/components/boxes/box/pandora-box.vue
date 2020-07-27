<template>
    <div v-if="box">

        <span>hash: {{ this.box.hash.toString('hex') }}</span>
        <span>name: {{ this.box.name }}</span>
        <span>description: {{ this.box.description }}</span>

        <textarea type="text" rows="4" cols="50" v-model="streams" />

        <span v-if="enableStreamliner" @click="streamline" style="cursor: pointer" > >>>> </span>

        Percent {{percent}} %

    </div>
</template>

<script>
export default {

    props: {
        box: null,
        enableStreamliner: false,
    },

    data(){
        return {
            percent: 0,
        }
    },

    computed:{

        streams(){

            let out = '';
            for (const stream of this.box.streams){
                const s =  stream.path+ '  '+ stream.type+'   '+ stream.size;
                out += s + '\n';
            }

            return out;
        }

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

        }

    },

    mounted(){
        this.percent = this.box.chunksTotalAvailable / (this.box.chunksTotal || 1) * 100;
        this.box.on('chunks/total-available', ({chunksTotalAvailable, chunksTotal} ) => {
            this.percent = chunksTotalAvailable / ( chunksTotal || 1) * 100;
        } )
    }

}
</script>

<style scoped>
    div,
    span{
        display:block;;
    }
</style>