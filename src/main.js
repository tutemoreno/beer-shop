import {
  BeerTextField,
  BeerCard,
  BeerBtn,
  BeerCheckbox,
  BeerSelect,
  BeerList,
} from '@/overridedComponents';

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.component('beer-text-field', BeerTextField);
Vue.component('beer-card', BeerCard);
Vue.component('beer-list', BeerList);
Vue.component('beer-btn', BeerBtn);
Vue.component('beer-checkbox', BeerCheckbox);
Vue.component('beer-select', BeerSelect);
// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
