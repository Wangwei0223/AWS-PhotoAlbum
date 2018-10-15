<template>
    <div>
      <chat-header title="Chat with a chat bot"></chat-header>
      <chat-screen></chat-screen>
      <text-box></text-box>
      <router-view></router-view>
    </div>
</template>

<script>
import chatHeader from './components/chatHeader.vue';
import chatScreen from './components/chatScreen.vue';
import textBox from './components/textBox.vue';
export default {
  name:'app',
  components:{
    chatHeader,
    chatScreen,
    textBox
  },
}
</script>



