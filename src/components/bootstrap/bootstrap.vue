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
            bootstrap: '6c383a7265736561726368363a302e3130313769326569316531333a38362e3132362e3133382e363169313030303165303a36353a04730d5a3dcc85d3d54ef0f5de9e3e474e1d4178bd42925cf1b4ca1171958eccd452473834a3d4935131ffb66145586e7e2a381f5d9850cdffc967c46f460e562269306536343af3b6925446eac8e4fe095c1bafb7a56dedf9e6e1fc0ecdc6cff10885f045c3336f2a8bac0088fb276a340bb5c9d71a07634a68e648566efa3788aedfe57a1e3e69313630303938323530306536343af36153edcab3e392c18b4a89fb88f98a44ee99caa20842ef9ad6efda5d565fd31dd3fa9b4161be818ec017311a049b59e0d1b1694db8f8231a71721e18d5590e69316565',
            status: '',
            out: '',
        }
    },

    methods: {

        async bootstrapNow(){

            const data = PANDORA_PROTOCOL.KAD.library.bencode.decode( Buffer.from( this.bootstrap, 'hex') );
            const contact = PANDORA_PROTOCOL_NODE.createContact( data );

            this.loading = true;

            try{

                const out = await PANDORA_PROTOCOL_NODE.bootstrap( contact, true);

                this.status = 'Success! '+out.length;
                this.out = JSON.stringify(out);

            }catch(err){
                this.status = 'Error';
                console.error(err);
            }

            this.loading = false;

        }

    }

}
</script>

<style scoped>

</style>