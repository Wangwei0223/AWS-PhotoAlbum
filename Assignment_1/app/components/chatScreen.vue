<template>
    <div class="screen">
        <div :class="{'container': item.type === 0, 'container-reverse': item.type === 1}" v-for="(item, index) in messages" :key="index">
        <img src="https://raw.githubusercontent.com/Wangwei0223/markdown_photos/master/test-image/J.fla.png" class="animated fadeInUp">
        <div class="animated" :class="{'bounceInLeft':item.type === 0, 'bounceInRight':item.type === 1}">{{item.msg}}</div>
        </div>
    </div>
</template>


<script>
import eventBus from "../utils/eventBus";
export default {
  data() {
    return {
      // 0 send 1 receive
      messages: [{ msg: "hello", type: 0 }, { msg: "oh", type: 1 }]
    };
  },
  methods: {
    
  },
  mounted() {
    eventBus.$on("sendMessage", (msg, type) => {
      this.messages.push({ msg: msg, type: type });
    });
  }
};
</script>

<style lang="scss" scoped>
    @import '../common/chatScreen.scss';
</style>
