<template>
    <div class="div">

        <span>Bootstrap Contact (BENCODED):</span>
        <input type="text" v-model="bootstrap" />
        <button @click="bootstrapNow">Bootstrap now!</button>

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
            bootstrap: '',
            status: '',
            out: '',
        }
    },

    methods: {

        bootstrapNow(){

            const data = PANDORA_PROTOCOL.KAD.library.bencode.decode( Buffer.from( this.bootstrap, 'hex') );
            const contact = PANDORA_PROTOCOL.KAD.Contact.fromArray( PANDORA_PROTOCOL_NODE, data );

            PANDORA_PROTOCOL_NODE.bootstrap( contact, true, (err, out )=>{

                if (err) {
                    this.status = 'Error';
                    return this.out = out;
                }

                this.status = 'Success! ';
                this.out = JSON.stringify(out);

            })

        }

    }

}
</script>

<style scoped>

</style>