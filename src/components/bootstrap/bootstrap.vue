<template>
    <div class="div">

        <h3>Bootstrap</h3>

        <span>Bootstrap Contact (BENCODED):</span>
        <input type="text" v-model="bootstrap" />

        <span v-if="loading">Loading...</span>
        <button v-else @click="bootstrapNow">Bootstrap now!</button>

        <div style="display:block;">
            {{status}}
            <textarea v-if="out" type="text" rows="4" cols="50" v-model="out" />
        </div>

    </div>
</template>

<script>

import config from "config/config"

export default {

    data(){
        return {
            loading: false,
            bootstrap: config.BOOTSTRAP_CONTACT,
            status: '',
            out: '',
        }
    },

    methods: {

        async bootstrapNow(){

            this.loading = true;

            try{

                const out = await PANDORA_PROTOCOL_NODE.bootstrap( this.bootstrap, true);

                this.status = 'Success! '+out.length;
                this.out = JSON.stringify(out);

            }catch(err){
                this.status = 'Error';
                console.error(err);
            }

            this.loading = false;

        }

    },


}
</script>

<style scoped>

</style>