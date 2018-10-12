<template>
    <div>
        <p>ChatBot Demo</p>
        <button @click="testLambdaDemo()">测试Lambda Demo</button>
        <button @click="sendMessage()">送信</button>
        <h1 class="animated bounceInLeft">Animate</h1>
        <p>{{data_1}}</p>
    </div>
</template>

<script>
import { GetTestInfo } from "../utils/data";
import eventBus from '../utils/eventBus';
export default {
  data() {
    return {
      data_1: ""
    };
  },
  methods: {
    testLambdaDemo() {
      console.log("Test Lambda Demo");
      let param = {
        key1: "I am one",
        key2: "I am two",
        key3: "I am three"
      };
      GetTestInfo(param).then(response => {
        // this.data_1 = response["data"]["body"];
        console.log(response);
        this.data_1 = response;
      });
    },
    sendMessage(){
      eventBus.$emit('sendMessage', 'avc');
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
@import "../common/test.scss";
</style>

