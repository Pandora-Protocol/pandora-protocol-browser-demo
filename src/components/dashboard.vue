<template>
    <div>

        <h1>Demo Dashboard</h1>


        <bootstrap></bootstrap>
        <find></find>
        <streams></streams>

    </div>
</template>

<script>

import Bootstrap from "./bootstrap/bootstrap"
import Streams from "./boxes/pandora-boxes"
import Find from "./find/find"

export default {

    components: {Bootstrap, Streams, Find},



}
</script>