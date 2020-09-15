<template>

    <div v-if="this.modalOpened">
        <div class="modalDialog">
            <div class="modalContent">

                <span title="Close" class="close" @click="closeModal">X</span>

                <h2>{{title}}</h2>

                <slot></slot>

            </div>
        </div>
    </div>

</template>


<script>

export default{

    data: () => {
        return {
            modalOpened: false,
        }
    },

    props:{

        title: {default: 'Modal Title'},

    },

    methods:{

        closeModal(e, propagateEvent = true){

            if (!this.modalOpened) return;

            if( e ) e.stopPropagation();
            this.modalOpened = false;

            if (propagateEvent)
                this.$emit('onCloseModal', true);
        },

        showModal(e){

            if (this.modalOpened) return;

            if ( e ) e.stopPropagation();
            this.modalOpened = true;

        },

    }

}

</script>



<style>

    .modalDialog {
        position: fixed;
        font-family: Arial, Helvetica, sans-serif;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 99999;
        -webkit-transition: opacity 400ms ease-in;
        -moz-transition: opacity 400ms ease-in;
        transition: opacity 400ms ease-in;
    }

    .modalContent {
        max-width: 400px;
        position: relative;
        margin: 0 auto;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px 20px 13px 20px;
        border-radius: 10px;
        background: #fff;

    }
    .close {
        background: #606061;
        color: #FFFFFF;
        line-height: 25px;
        position: absolute;
        right: -12px;
        text-align: center;
        top: -10px;
        width: 24px;
        text-decoration: none;
        font-weight: bold;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        -moz-box-shadow: 1px 1px 3px #000;
        -webkit-box-shadow: 1px 1px 3px #000;
        box-shadow: 1px 1px 3px #000;
        cursor: pointer;
    }
    .close:hover {
        background: #00d9ff;
    }

</style>
