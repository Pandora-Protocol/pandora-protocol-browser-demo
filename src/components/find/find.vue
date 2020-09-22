<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" v-on:keyup.enter="onEnter" />
        <button @click="click">-></button>


        <pandora-box v-for="(obj, index) in result"
                     :key="`find_pandora_box_${index}`"
                     :enableStreamliner="true"
                     :hash="obj.hash">

        </pandora-box>

        {{status}}

    </div>
</template>

<script>
import PandoraBox from "../boxes/box/pandora-box"

export default {

    components: {PandoraBox},

    data(){
        return {
            value: '',

            status: '',
            result: [],
        }
    },

    methods:{

        onEnter(){
            return this.click();
        },

        async click(){

            this.status = '';
            const value = this.value.replace(/\s+/g, ' ').trim();

            for (const {hash, type} of this.result){

                if (type === "pandoraBox") this.$store.dispatch('pandoraBoxRemove', {hashHex: hash});
                else if (type === "pandoraBoxMeta") this.$store.dispatch('pandoraBoxRemove', {hashHex: hash});

            }

            this.result = [];

            //search box
            if (value.length === 2*global.KAD_OPTIONS.NODE_ID_LENGTH){ //by hash

                try{

                    const pandoraBox = await PANDORA_PROTOCOL_NODE.findPandoraBox( Buffer.from( value, 'hex') );

                    this.status = 'Success!';

                    this.processPandoraBox(pandoraBox);

                }catch(err){
                    this.status = 'Error finding box';
                    console.error(err);
                }

            } else { //by keyword hash

                try{
                    const out = await PANDORA_PROTOCOL_NODE.findPandoraBoxesByName( value );

                    for (const key in out.result)
                        this.processPandoraBoxMeta(out.result[key]);

                    this.status = 'Success!';

                }catch(err){
                    this.status = 'Error finding boxes';
                    console.error(err);
                }

            }

        },

        processPandoraBox(pandoraBox){

            this.$store.dispatch('pandoraBoxesAdd', {pandoraBox, stored: false});
            this.result.push( {
                hash: pandoraBox.hashHex,
                type: "pandoraBox",
            } );

        },

        processPandoraBoxMeta(pandoraBoxMeta){
            this.$store.dispatch('pandoraBoxMetasAdd', {pandoraBoxMeta, stored: false});
            this.result.push( {
                hash: pandoraBoxMeta.hashHex,
                type: "pandoraBoxMeta"
            } );
        }

    }

}
</script>