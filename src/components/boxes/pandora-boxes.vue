<template>
    <div>
        <h3>Pandora Boxes</h3>

        <seed-pandora-box></seed-pandora-box>

    </div>
</template>

<script>

import SeedPandoraBox from "./seed-pandora-box"

export default {

    components: {SeedPandoraBox},

    data(){
        return {

        }
    },

    methods: {
        refresh(){

        }
    },

    mounted(){
        this.refresh();
    }

}
</script>