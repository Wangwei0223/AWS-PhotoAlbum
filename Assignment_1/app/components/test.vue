<template>
    <div>
        <p>ChatBot Demo</p>
        <button @click="testLambdaDemo()">测试Lambda Demo</button>
        <button @click="sendMessage()">送信</button>
        <h1 class="animated bounceInLeft">Animate</h1>
        <button @click="test()">测试</button>
        <p>{{data_1}}</p>
    </div>
</template>

<script>
import { GetTestInfo } from "../utils/data";
import { GetTestInfoPost } from "../utils/data";
import eventBus from "../utils/eventBus";
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
      // GetTestInfo(param).then(response => {
      //   // this.data_1 = response["data"]["body"];
      //   console.log(response);
      //   this.data_1 = response;
      // });
      let param1 = {
        messages: [
          {
            type: "string",
            unstructured: {
              id: "123123123",
              text: "I am WEI WANG",
              timestamp: "1231232131"
            }
          }
        ]
      };
      console.log('TEST ============================= POST');
      GetTestInfoPost(param1).then(response => {
        console.log(response);
      });
    },
    sendMessage() {
      eventBus.$emit("sendMessage", "avc");
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
@import "../common/test.scss";
</style>

