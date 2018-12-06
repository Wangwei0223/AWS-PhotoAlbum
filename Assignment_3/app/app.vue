<template>
    <div>
      <!-- <chat-header title="Chat with a chat bot"></chat-header>
      <chat-screen></chat-screen>
      <text-box></text-box> -->
      <router-view></router-view>
    </div>
</template>

<script>
import { Auth, Session, confrimLogin, mockLogin } from "./utils/cognito";
// import chatHeader from './components/chatHeader.vue';
// import chatScreen from './components/chatScreen.vue';
// import textBox from './components/textBox.vue';
export default {
  name: "app",
  components: {
    // chatHeader,
    // chatScreen,
    // textBox
  },
  created() {
    // App enter, immediately check user and add user to localstroage
    Auth('jl9075@nyu.edu','Yeah123!');
    // confrimLogin();
    // Auth('291978313@qq.com', 'Ww950223_');
    // Auth('jl9075@nyu.edu','Yeah123!');
    // this.$router.push('/search');
  },
};
</script>



