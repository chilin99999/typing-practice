import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: null,
    time: null,
  },
  mutations: {
    set(state, { topic, time }) {
      state.topic = topic;
      state.time = time;
    },
  },
  actions: {
  },
  modules: {
  },
});
