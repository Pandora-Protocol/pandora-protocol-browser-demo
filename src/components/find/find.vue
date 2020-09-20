<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" v-on:keyup.enter="onEnter" />
        <button @click="click">-></button>

        <pandora-box v-for="(box,index) in boxes"
                     :key="`find_pandora_box_${index}`"
                     :enableStreamliner="true"
                     :box="box">

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
            boxes: [],
        }
    },

    methods:{

        onEnter(){
            return this.click();
        },

        async click(){

            this.status = '';
            const value = this.value.replace(/\s+/g, ' ').trim();
            this.boxes = [];

            //search box
            if (value.length === 2*global.KAD_OPTIONS.NODE_ID_LENGTH){ //by hash

                try{

                    const pandoraBox = await PANDORA_PROTOCOL_NODE.findPandoraBox( Buffer.from( value, 'hex') );

                    console.log( pandoraBox );

                    this.status = 'Success!';
                    this.boxes.push(pandoraBox);

                }catch(err){
                    this.status = 'Error';
                    console.error(err);
                }

            } else { //by keyword hash

                try{
                    const out = await PANDORA_PROTOCOL_NODE.findPandoraBoxesByName( value );

                    for (const key in out.result) {
                        const box = out.result[key].toJSON(true)
                        box.hash = out.result[key].hash.toString('hex');

                        this.boxes.push( box );
                    }

                    this.status = 'Success!';

                }catch(err){
                    this.status = 'Error';
                    console.err(err);
                }

            }



        }

    }

}
</script>