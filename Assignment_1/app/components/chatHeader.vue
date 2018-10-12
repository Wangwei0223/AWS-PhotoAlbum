<template>
    <div class="parent">
    <div class="header">
        {{title}}
    </div>
    </div>  
</template>

<script>
export default {
    props:{
        title:String,
    }
}
</script>

<style lang="scss" scoped>
    @import "../common/top.scss";;
</style>
