<template>
    <div>
        <h3>Pandora Boxes</h3>

        <pandora-box v-for="(box, index) in pandoraBoxes"
            :key="`pandora_box_${index}`"
            :box="box">
        </pandora-box>

    </div>
</template>

<script>

import PandoraBox from "./../boxes/box/pandora-box"
import Vue from 'vue';

export default {

    components: { PandoraBox },

    data(){
        return {
            pandoraBoxes: {},
        }
    },

    mounted(){

        this.pandoraBoxes = {...PANDORA_PROTOCOL_NODE.pandoraBoxes._boxesMap};

        PANDORA_PROTOCOL_NODE.pandoraBoxes.on('pandora-box/added', pandoraBox => {
            Vue.set(this.pandoraBoxes, pandoraBox.hash.toString('hex'), pandoraBox );
        })

    }

}
</script>