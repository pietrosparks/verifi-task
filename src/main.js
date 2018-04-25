// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy';
import axios from 'axios';
import swal from 'sweetalert2';
import Datepicker from 'vuejs-datepicker';
import 'buefy/lib/buefy.css';
import lodash from 'lodash';



if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = process.env.BASEURL_PROD;
} else axios.defaults.baseURL = process.env.API_BASE_URL;


Vue.use(Buefy);
Vue.use(require('vue-moment'));
Vue.prototype.$axios = axios;
Vue.prototype.$lodash = lodash
Vue.prototype.$modalResponse = swal;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
   
  },
  template: '<App/>'
})
