import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: null,
    time: null,
    speekSpeedRate: 1,
    mode: 'sentence', // sentence or paragraph
  },
  mutations: {
    set(state, { topic, time, speekSpeedRate, mode }) {
      state.topic = topic;
      state.time = time;
      state.speekSpeedRate = speekSpeedRate;
      state.mode = mode;
    },
  },
  actions: {
  },
  modules: {
  },
});
