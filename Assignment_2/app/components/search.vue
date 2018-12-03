<template>
  <div>
    <p>Search Image</p>
    <input type="text" v-model="keyword"><span><button @click="send">Search</button></span>
  </div>
</template>

<script>
import { SendMessage } from "../utils/data";

export default {
  data() {
    return {
        keyword:''
    };
  },
  methods:{
    send(){
      SendMessage(this.keyword).then(data => {
        console.log(data);
      })
    }
  }
};
</script>
