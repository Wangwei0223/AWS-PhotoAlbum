<template>
    <div>
        <div class="content">
            <div>Test Cognito</div>
            <button @click="Test">测试注册</button>
            <input type="text" v-model="code"/><button @click="SendCode">测试验证码</button>
            <input type="text" v-model="username" /> <input type="text" v-model="password"/><button @click="SendAuth">测试Auth</button>
        </div>
    </div>    
</template>

<script>
import { RegisterUser, Confrim, Auth } from "../utils/cognito";

export default {
  data(){
      return{
          code:'',
          username:'',
          password:''
      }
  },
  created() {

  },
  methods:{
      Test(){
          RegisterUser();
      },
      SendCode(){
          Confrim(this.code);
      },
      SendAuth(){
          Auth(this.username, this.password);
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/cognito.scss";
</style>
