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
export default {

    data(){
        return {
            loading: false,
            bootstrap: '',
            status: '',
            out: '',
        }
    },

    methods: {

        bootstrapNow(){

            const data = PANDORA_PROTOCOL.KAD.library.bencode.decode( Buffer.from( this.bootstrap, 'hex') );
            const contact = PANDORA_PROTOCOL_NODE.createContact( data );

            this.loading = true;

            PANDORA_PROTOCOL_NODE.bootstrap( contact, true, (err, out )=>{

                this.loading = false;

                console.log(err, out);

                if (err) {
                    this.status = 'Error';
                    return this.out = out;
                }

                this.status = 'Success! '+out.length;
                this.out = JSON.stringify(out);

            })

        }

    }

}
</script>

<style scoped>

</style>