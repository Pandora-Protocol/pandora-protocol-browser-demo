<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" />
        <button @click="click">-></button>

        <pandora-box v-for="(box,index) in boxes"
                     :key="`find_pandora_box_${index}`"
                     :enableStreamliner="true"
                     :box="box">

        </pandora-box>

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

        click(){

            const value = this.value.replace(/\s+/g, ' ').trim();
            this.boxes = [];

            //search box
            if (value.length === 2*global.KAD_OPTIONS.NODE_ID_LENGTH){ //by hash

                PANDORA_PROTOCOL_NODE.findPandoraBox( Buffer.from( value, 'hex'), (err, pandoraBox )=> {

                    console.log(pandoraBox);

                    if (err) {
                        this.status = 'Error';
                        return console.log(err);
                    }

                    this.status = 'Success!';
                    this.boxes.push(pandoraBox);

                });

            } else { //by keyword hash


            }



        }

    }

}
</script>