import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
Vue.config.productionTip = false


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'animate.css';


import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;
Vue.use(BootstrapVue)

// import VueCookie from 'vue-cookie'
// Vue.use(VueCookie)   // 掛在在全域性了
// import Cookies from 'js-cookie';
// Vue.prototype.$cookie=Cookies;
// Vue.use(Cookies) 
// import Vue from 'Vue'
// import VueCookie from 'vue-cookie'
// Vue.use(VueCookie)   // 掛在在全域性了
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('30d')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
