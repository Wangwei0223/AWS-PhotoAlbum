<template>
    <div class="screen">
        <div :class="{'container': item.type === 0, 'container-reverse': item.type === 1}" v-for="(item, index) in messages" :key="index">
        <img :class="{'send-img':item.type === 0, 'receive-img':item.type === 1}" class="animated fadeInUp">
        <div class="animated" :class="{'bounceInLeft':item.type === 0, 'bounceInRight':item.type === 1}">{{item.msg}}</div>
        </div>
        <div v-show="typing">
          <div class="animated bounceInLeft">Typing...</div>
        </div>
    </div>
</template>


<script>
import eventBus from "../utils/eventBus";
import { GetTestInfoPost } from "../utils/data";
export default {
  data() {
    return {
      // 0 send 1 receive
      messages: [
        { msg: "Hello, I am a Bot. You can chat with me now.", type: 0 }
      ],
      typing: false
    };
  },
  methods: {},
  mounted() {
    eventBus.$on("sendMessage", response => {
      this.messages.push(response);
      this.typing = true;
      let param = {
        messages: [
          {
            type: "string",
            unstructured: {
              id: +new Date() + "chatbot",
              text: response.msg,
              timestamp: +new Date()
            }
          }
        ]
      };
      GetTestInfoPost(param)
        .then(response => {
          this.typing = false;
          response.data.statusCode === 200
            ? this.messages.push({
                msg: JSON.parse(response.data.body).messages[0].unstructured
                  .text,
                type: 0
              })
            : this.messages.push({
                msg: "Error",
                type: 0
              });
        })
        .catch(() => {
          this.typing = false;
          this.messages.push({
            msg: "Time out Error, please try again",
            type: 0
          });
        });
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../common/chatScreen.scss";
</style>
