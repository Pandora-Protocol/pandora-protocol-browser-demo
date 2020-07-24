<template>
    <div>
        <h3>Find</h3>
        <input type="text" v-model="value" />
        <button @click="click">[]</button>
    </div>
</template>

<script>
export default {

    data(){
        return {
            value: ''
        }
    },

    methods:{

        click(){

        }

    }

}
</script>