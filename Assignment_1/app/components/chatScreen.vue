<template>
    <div class="screen">
        <div v-for="(item, index) in messages" :key="index">{{item.msg}}, {{item.type}}</div>
    </div>
</template>


<script>
import eventBus from "../utils/eventBus";
export default {
  data() {
    return {
      messages: [{ msg: "hello", type: 1 }, { msg: "oh", type: 0 }]
    };
  },
  methods: {
    receiveMessage(msg, type) {

    }
  },
  mounted() {
    eventBus.$on("sendMessage", (msg, type) => {
      this.messages.push({ msg: msg, type: type });
    });
  }
};
</script>
