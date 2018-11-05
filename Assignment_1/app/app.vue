<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'app',
  created(){
    this.$router.push('/lex');
  }
}
</script>



