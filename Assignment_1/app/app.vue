<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
import {Auth, Session } from "./utils/cognito";

export default {
  name:'app',
  created(){
    // App enter, immediately check user and add user to localstroage
    Auth('ww1306@nyu.edu', 'Ww950223_');
    this.$router.push('/chatBot');
  }
}
</script>



