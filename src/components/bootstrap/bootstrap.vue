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
            bootstrap: '6c383a7265736561726368363a302e3130313769326569316531333a38362e3132362e3133382e363169313030303265303a36353a04367082824b4f69be225e4192d8dcafe10f3b216bc0ddae2668fc9b26da78af8ae78dca341dfbb14b5b2dd72073241c7be965035c1f15d323fb3a6cc1000fdd8169306536343abc3314e0e613e328db04520a6fc9d6ef30252ea5301f0faef9ed7c654fa3f41667458a481c8885a18b88bf7e8d561565779dc1e8246210d0157f20e6656b8db869313630303630353534356536343a66c373865e79538a398b24d548988a7a3abfc7561c3c64ae1bf22314cef6f170460891b10504802d36b16edf612aba1f02e3e81ee704fa6af6854a802c9ef10469316565',
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