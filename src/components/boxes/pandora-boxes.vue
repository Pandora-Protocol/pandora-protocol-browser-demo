<template>
    <div>
        <h3>Pandora Boxes</h3>

        <pandora-box v-for="(box, hash) in pandoraBoxes"
            :key="`pandora_box_${hash}`"
            :hash="hash">
        </pandora-box>

    </div>
</template>

<script>

import PandoraBox from "./../boxes/box/pandora-box"
import Vue from 'vue';

export default {

    components: { PandoraBox },

    computed: {

        pandoraBoxes(){
            return this.$store.state.pandoraBoxes.list;
        }

    },

    methods: {



    },

}
</script>