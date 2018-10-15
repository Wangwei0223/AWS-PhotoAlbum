<template>
    <div class="textplain">
        <textarea class="area" @keyup.enter="keyUp($event)" v-model="text" placeholder="Press Enter to Send Message"></textarea>
    </div>
</template>


<script>
import eventBus from "../utils/eventBus";
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    submit() {
      let text = {
        msg: this.text,
        type: 1
      };
      if (this.text.trim() !== "") {
        eventBus.$emit("sendMessage", text);
      }
      this.text = "";
    },
    keyUp(e) {
      let code = e.keyCode;
      let ctrl = e.ctrlKey;
      let shift = e.shiftKey;
      let alt = e.altKey;
      if (code == "10" && ctrl && !shift && !alt) {
      }
      if (code == "13" && !ctrl && shift && !alt) {
      }
      if (code == "13" && !ctrl && !shift && !alt) {
        this.submit();
      }
    }
  }
};
</script>

<style type="text/css"  lang="scss" scoped>
@import "../common/bottom.scss";
</style>

