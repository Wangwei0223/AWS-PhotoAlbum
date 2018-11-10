<template>
    <div>
      <chat-header title="Chat with a chat bot"></chat-header>
      <chat-screen></chat-screen>
      <text-box></text-box>
    </div>
</template>

<script>
import chatHeader from './chatHeader.vue';
import chatScreen from './chatScreen.vue';
import textBox from './textBox.vue';
export default {
  name:'ChatBot',
  components:{
    chatHeader,
    chatScreen,
    textBox
  } 
}
</script>
