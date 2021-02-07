import Vue from 'vue';

import './utils/extend';
import { tApi, nApi } from './utils/request';

import store from './store';
import router from './router';

import i18n from './plugins/i18n';
import './plugins/element/theme/index.css';
import './plugins/element';

import VueContextMenu from 'vue-context-menu';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueContextMenu, {
  useItem: true,
  mobileSupport: false,
});

Vue.prototype.$tApi = tApi;
Vue.prototype.$nApi = nApi;

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
