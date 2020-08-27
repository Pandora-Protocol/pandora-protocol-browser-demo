<template>
    <div>

        <span>Contact: </span>
        <div class="block">
            <textarea rows="6" cols="100">{{$store.state.pandoraProtocol.contactHex}}</textarea>
        </div>

        <span>Contact JSON</span>
        <div class="block">
            <textarea rows="6" cols="100">{{$store.state.pandoraProtocol.contactJSON}}</textarea>
        </div>
    </div>
</template>

<script>
export default {

}
</script>