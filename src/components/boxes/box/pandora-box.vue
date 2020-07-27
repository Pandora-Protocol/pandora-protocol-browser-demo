<template>
    <div v-if="box">

        <span>hash: {{ this.box.hash.toString('hex') }}</span>
        <span>name: {{ this.box.name }}</span>
        <span>description: {{ this.box.description }}</span>

        <textarea type="text" rows="4" cols="50" v-model="streams" />

        <span @click="streamline" style="cursor: pointer" > >>>> </span>

    </div>
</template>

<script>
export default {

    props: {
        box: null,
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

    }

}
</script>

<style scoped>
    div,
    span{
        display:block;;
    }
</style>