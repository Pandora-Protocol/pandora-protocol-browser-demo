<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" />
        <button @click="click">😃</button>

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
            value: '',
            status: '',
            out: '',
        }
    },

    methods:{

        click(){

            const value = this.value.replace(/\s+/g, ' ').trim();

            //search box
            if (value.length === 2*global.KAD_OPTIONS.NODE_ID_LENGTH){ //by hash


                PANDORA_PROTOCOL_NODE.findPandoraBox( Buffer.from( value, 'hex'), (err, pandoraBox )=> {

                    if (err) {
                        this.status = 'Error';
                        return this.out = err;
                    }

                    this.status = 'Success! ';
                    this.out = JSON.stringify( pandoraBox.toJSON() );

                });

            } else { //by keyword hash


            }

        }

    }

}
</script>