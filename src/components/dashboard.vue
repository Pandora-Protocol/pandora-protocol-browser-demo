<template>
    <div>

        <h1>Demo Dashboard</h1>

        <span>Bootstrap:</span>
        <input type="text" v-model="bootstrap" />
        <button @click="bootstrapNow">Bootstrap now!</button>

        <find></find>
        <streams></streams>

    </div>
</template>

<script>

import Streams from "./streams/streams"
import Find from "./find/find"

export default {

    components: {Streams, Find},

    data(){
        return {
            bootstrap: '',
        }
    },

    methods: {

        bootstrapNow(){

        }

    }

}
</script>