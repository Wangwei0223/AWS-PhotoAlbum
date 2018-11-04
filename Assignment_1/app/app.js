import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue'
import axios from 'axios';
import test from './components/test.vue'
import cognito from './components/cognito.vue';
import chatBot from './components/chatBot.vue';

Vue.prototype.$axios = axios;
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/test', component: test },
        { path: '/cognito', component: cognito },
        { path: '/chatBot', component: chatBot }

    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
