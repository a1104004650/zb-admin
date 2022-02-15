import Vue from "vue";
import Vuex from "vuex";
import storeModules from './modules/index'

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    storeModules
  }
});
