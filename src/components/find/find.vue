<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" />
        <button @click="click">[]</button>
        {{status}}
    </div>
</template>

<script>
export default {

    data(){
        return {
            value: '',
            status: ''
        }
    },

    methods:{

        click(){

            const value = this.value.replace(/\s+/g, ' ').trim();

            //search box
            if (value.length === global.KAD_OPTIONS.NODE_ID_LENGTH){ //by hash


                PANDORA_PROTOCOL_NODE.findPandoraBox( Buffer.from( value, 'hex'), (err, out )=> {

                    if (err) return this.status = err;

                    this.status = out.pandoraBox.toJSON();

                });

            } else { //by keyword hash


            }

        }

    }

}
</script>