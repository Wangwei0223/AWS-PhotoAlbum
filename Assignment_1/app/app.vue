<template>
    <div>
      <chat-header title="Chat with a chat bot"></chat-header>
      <chat-screen></chat-screen>
      <router-view></router-view>
    </div>
</template>

<script>
import chatHeader from './components/chatHeader.vue';
import chatScreen from './components/chatScreen.vue';
export default {
  name:'app',
  components:{
    chatHeader,
    chatScreen
  },
}
</script>



