import {
  CustomTextField,
  CustomCard,
  CustomList,
  CustomBtn,
  CustomCheckbox,
  CustomSelect,
  CustomBtnToggle,
} from '@/overridedComponents';

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.component('c-text-field', CustomTextField);
Vue.component('c-btn-toggle', CustomBtnToggle);
Vue.component('c-card', CustomCard);
Vue.component('c-list', CustomList);
Vue.component('c-btn', CustomBtn);
Vue.component('c-checkbox', CustomCheckbox);
Vue.component('c-select', CustomSelect);
// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
