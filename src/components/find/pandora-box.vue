<template>
    <div>

        <span>hash: {{ this.box.hash.toString('hex') }}</span>
        <span>name: {{ this.box.name }}</span>
        <span>description: {{ this.box.description }}</span>

        <textarea type="text" rows="4" cols="50" v-model="streams" />

        <span @click="streamline" style="cursor: pointer" >>>>> </span>
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
                const s =  stream.path+'   '+ stream.size;
                out += s + '\n';
            }

            return out;
        }

    },

    methods:{

        streamline(){

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