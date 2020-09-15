<template>
    <div>
        <template v-if="loading">
            publishing...
        </template>
        <template v-else>
            <div class="vote upvote"></div><br/>
            <span class="sum">{{sum}}</span>
            <div class="vote downvote"></div>
        </template>
    </div>
</template>

<script>
export default {

    data(){
        return {
            loading: false,
        }
    },

    props:{
        hash: {default: ''},
        sum: {default: 0},
    }

}
</script>

<style scoped>

    .sum{
        position:absolute;
        margin-left: 4px;
        margin-top: -10px;
    }

    .vote{
        cursor: pointer;
    }

    .upvote {
        width: 0;
        height: 0;
        border-color: #CCCCFF;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #CCCCFF;
    }
    .upvote:after {
          width: 5px;
          height: 6px;
          background-color: #CCCCFF;
          content: '';
          position:absolute;
          margin-top: 8px;
          margin-left: -3px;
      }

    .downvote {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #CCCCFF;
        margin-left: -1px;
        margin-top: 13px;
    }
    .downvote:after {
          width: 5px;
          height: 6px;
          background-color: #CCCCFF;
          content: '';
          position:absolute;
          margin-left: -2px;
          margin-top: -14px;
      }
</style>