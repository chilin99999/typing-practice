import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: null,
    time: null,
    speekSpeedRate: 1,
  },
  mutations: {
    set(state, { topic, time, speekSpeedRate }) {
      state.topic = topic;
      state.time = time;
      state.speekSpeedRate = speekSpeedRate;
    },
  },
  actions: {
  },
  modules: {
  },
});
