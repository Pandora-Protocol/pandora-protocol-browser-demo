<template>
    <div>
        <span>Bootstrap Contact (BENCODED):</span>
        <input type="text" v-model="bootstrap" />
        <button @click="bootstrapNow">Bootstrap now!</button>

        {{status}}

    </div>
</template>

<script>
export default {

    data(){
        return {
            bootstrap: '',
            status: '',
        }
    },

    methods: {

        bootstrapNow(){

            const data = PANDORA_PROTOCOL.KAD.library.bencode.decode( Buffer.from( this.bootstrap, 'hex') );
            const contact = PANDORA_PROTOCOL.KAD.Contact.fromArray( PANDORA_PROTOCOL_NODE, data );

            PANDORA_PROTOCOL_NODE.bootstrap( contact, true, (err, out )=>{

                if (err) this.status = err;
                else this.status = 'Success! '+out.length;

            })

        }

    }

}
</script>