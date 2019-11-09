import Vue from 'vue';
import VueRouter from 'vue-router';
import Setting from '../views/Setting';
import Game from '../views/Game.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'setting',
    component: Setting,
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
