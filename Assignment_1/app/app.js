import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue'
import axios from 'axios';
import test from './components/test.vue'

Vue.prototype.$axios = axios;
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/test', component: test },
    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
