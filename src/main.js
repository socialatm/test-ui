import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
