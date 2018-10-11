import Vue from 'vue';
import App from './app.vue'
import axios from 'axios';

Vue.prototype.$axios = axios;

new Vue({
    el: '#app',
    render: h => h(App),
});
