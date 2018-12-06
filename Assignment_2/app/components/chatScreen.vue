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
import { Post } from "../utils/data";
import { testLex, lexRuntime, userName } from "../utils/lex";
import { globalSession } from '../utils/cognito';

export default {
  created() {
    testLex(globalSession);
    var lexruntime = lexRuntime(globalSession);
    this.lex = lexruntime;
    this.lexUserId = "DiningBot" + userName();
    this.sessionAttributes = {};

    eventBus.$on("sendMessage", response => {
      this.messages.push(response);
      this.typing = true;
      var params = {
        botAlias: "$LATEST",
        botName: "DiningBot",
        inputText: response.msg,
        userId: this.lexUserId,
        sessionAttributes: this.sessionAttributes
      };

      this.lex.postText(params, (err, data) => {
        if (err) {
          // console.log(err, err.stack);
          // console.log("Error:  " + err.message + " (see console for details)");
          this.resend(params);
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          console.log(data);
          this.typing = false;
          data.message
            ? this.messages.push({
                msg: data.message,
                type: 0
              })
            : this.messages.push({
                msg: "Error",
                type: 0
              });
        }
        // re-enable input
      });
    });
  },
  data() {
    return {
      // 0 send 1 receive
      messages: [
        { msg: "Hello, I am a Bot. You can chat with me now.", type: 0 }
      ],
      typing: false,
      input: "",
      lex: "",
      lexUserId: "",
      sessionAttributes: {},
      idToken:''
    };
  },
  methods: {
    resend(params){
      this.lex.postText(params, (err, data) => {
        if (err) {
          // console.log(err, err.stack);
          // console.log("Error:  " + err.message + " (see console for details)");
          console.log('re');
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          console.log(data);
          this.typing = false;
          data.message
            ? this.messages.push({
                msg: data.message,
                type: 0
              })
            : this.messages.push({
                msg: "Error",
                type: 0
              });
        }
        // re-enable input
      });
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
@import "../common/chatScreen.scss";
</style>
