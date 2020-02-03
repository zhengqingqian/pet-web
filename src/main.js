import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-video-section/dist/vue-video-section.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from '../src/config/router'
import store from "./config/store"
import API from '../src/config/api'
import VueVideoSection from 'vue-video-section'
import VueTypedJs from 'vue-typed-js'
import moment from 'moment'

Vue.prototype.$moment = moment
Vue.use(VueTypedJs)
Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.component('vue-video-section', VueVideoSection)
Vue.config.productionTip = false
axios.defaults.baseURL = API.URL;


moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'a few seconds',
        ss : '%d seconds',
        m:  "a minute",
        mm: "%d 分钟",
        h:  "an hour",
        hh: "%d 小时",
        d:  "a day",
        dd: "%d 天",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
