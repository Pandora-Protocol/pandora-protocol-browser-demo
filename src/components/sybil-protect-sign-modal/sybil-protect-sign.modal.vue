<template>
    <modal ref="refModal" title="Validate you are not a bot" @onCloseModal="onCloseModal">
        <div>
            <iframe class="iframe" :src="uri" height="160px" title="Validate you are not a bot"></iframe>
        </div>
        from: {{origin}}
    </modal>
</template>

<script>

import Modal from "src/components/modal/modal"

export default {

    components: {Modal},

    data(){
        return {
            origin: '',
            uri:'',
            message: '',
            promise: null,
            resolve: null,
            reject: null,
        }
    },

    methods:{

        hideModal(e){
            this.$refs['refModal'].closeModal(e, false);
        },

        onCloseModal(e){
            this.reject('Canceled');
        },

        showModal(e, origin, uri, message,resolve, reject){
            this.origin = origin;
            this.uri = uri;
            this.message = message;
            this.resolve = resolve;
            this.reject = reject;

            this.$refs['refModal'].showModal(e);
        },

    }

}
</script>

<style scoped>

    .iframe{
        border-style: none;
    }

</style>