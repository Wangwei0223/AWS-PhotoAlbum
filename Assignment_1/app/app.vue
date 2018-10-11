<template>
    <div class="content">
        <p>ChatBot Demo</p>
        <button @click="testLambdaDemo()"> 测试Lambda Demo</button>
        <p>{{data_1}}</p>
    </div>
</template>

<script>
import {GetTestInfo} from './utils/data.js';

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
          key1: 'I am one',
          key2: 'I am two',
          key3: 'I am three'
      }
    
    GetTestInfo(param).then(response => {
            // this.data_1 = response["data"]["body"];
            console.log(response);
        });
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
@import "./common/app.scss";
</style>

