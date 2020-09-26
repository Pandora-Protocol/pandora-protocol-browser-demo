<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" v-on:keyup.enter="onEnter" />

        <template v-if="!loading">
            <button @click="click">-></button>
        </template>
        <template v-else>loading...</template>

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
            loading: false,

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
            this.loading = true;

            try{

                const value = this.value.replace(/\s+/g, ' ').trim();

                for (const {hash, type} of this.result){

                    if (type === "pandoraBox") this.$store.dispatch('pandoraBoxRemove', {hashHex: hash});
                    else if (type === "pandoraBoxMeta") this.$store.dispatch('pandoraBoxRemove', {hashHex: hash});

                }

                this.result = [];

                //search box
                if (value.length === 2*global.KAD_OPTIONS.NODE_ID_LENGTH){ //by hash

                    const pandoraBox = await PANDORA_PROTOCOL_NODE.findPandoraBox( Buffer.from( value, 'hex') );

                    global.FIND_RESULTS = {}
                    global.FIND_RESULTS[pandoraBox.hashHex] = pandoraBox.pandoraBoxMeta;

                    this.processPandoraBox(pandoraBox);

                    this.status = 'Success!';


                } else { //by keyword hash

                    const out = await PANDORA_PROTOCOL_NODE.findPandoraBoxesByName( value );

                    if (!out)
                        return this.status = 'No results. Try different keywords';

                    global.FIND_RESULTS = out.result;

                    for (const key in out.result)
                        this.processPandoraBoxMeta(out.result[key]);

                    this.status = 'Success!';

                }

            }catch(err){
                this.status = 'Error finding box';
                console.error(err);
            }finally{
                this.loading = false;
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