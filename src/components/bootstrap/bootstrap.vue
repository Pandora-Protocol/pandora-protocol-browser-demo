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
            bootstrap: '6c383a7265736561726368363a302e3130313769326569316531333a38362e3132362e3133382e363169313030303465303a36353a046ef7cf93edadc84169795cbf64ee7d1f94ac328a6acc58ccc53a7f3e210554f53b9c7a343623b9aab4b60d37b51f33e106accf7748d57f7845edbeac2dcd220369306536343ab5062a070be44d3563dbf2e22efe51a85f571f3acc0de98658f09310efffb03c6dabddd78f7846bdec819e9d75f55338aa078135341bdc16cd01f5f5b51cd3ec69313630303533313934346536343a71700e55cadefdb6636ed4ba863c7f218eb68f006e05d7552ccfa982af55dbfa18c37146f1b915f3ec514165f5baa37cea25d2f5bcae3749838ec94d0c1bf61a69316565',
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