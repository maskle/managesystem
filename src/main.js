// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "./assets/css/all.css"
// import "./assets/css/bootstrap.min.css"
// import "./assets/css/font-awesome.min.css"
// import "./assets/css/foundation.min.css"
// import "./assets/js/jquery-1.11.0.min.js"
// import SmoothScroll from "./assets/js/smothscrool"
// import "./assets/js/highlight.min.js"
// import "./assets/js/jquery-stars"
// import "./assets/js/jquery.main"



import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/reset.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import commoncomp from "./components/common/index"
for (var i in commoncomp) {
    Vue.component(i, commoncomp[i]);
}

import filters from "./common/filter/time"
for (var i in filters) {
    Vue.filter(i, filters[i]);
}
import axios from "axios"

Vue.prototype.axios = axios;

import qs from "qs"

Vue.prototype.qs = qs;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})