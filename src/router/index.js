import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Beers from '@/views/Beers.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/beers', component: Beers },

  // redirect home
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
