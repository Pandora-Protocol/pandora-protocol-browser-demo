<template>
    <div>

        <h1>Demo Dashboard</h1>
        <p>
            This source code is released for educational and research purposes only, with the intent of researching
            and studying a decentralized p2p protocol for binary data streams. You may not use this source code for
            any illegal or unethical purpose; including activities which would give rise to criminal or civil liability.
        </p>

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