import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const type = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_LANGUAGE: "SET_LANGUAGE",
  EXIT_LOGIN: "EXIT_LOGIN"
};

const state = {
  user: {},
  token: "",
  language: "",
  tokenHeader: ""
};

//获取例子：this.$store.getters.token
const getters = {
  user: state => state.user,
  token: state => state.token,
  language: state => state.language,
  tokenHeader: state => state.tokenHeader
};

const mutations = {
  [type.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
  [type.SET_LANGUAGE](state, language) {
    if (language) state.language = language;
    else state.language = "";
  },
  [type.SET_TOKEN](state, token) {
    if (token) {
      state.token = token;
      state.tokenHeader = "Bearer " + token;
    } else {
      state.token = "";
      state.tokenHeader = "";
    }
  },
  [type.EXIT_LOGIN](state) {
    //清除所有cookie
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--; )
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
    state.token = "";
    state.tokenHeader = "";
    state.user = {};
  }
};

//设置例子：this.$store.dispatch('setToken',value).then(response => {}).catch(error => {})
const actions = {
  setUser: ({ commit }, user) => {
    commit(type.SET_USER, user);
  },
  setLanguage: ({ commit }, language) => {
    commit(type.SET_LANGUAGE, language);
  },
  setToken: ({ commit }, token) => {
    commit(type.SET_TOKEN, token);
  },
  exitLogin: ({ commit }) => {
    commit(type.EXIT_LOGIN);
  }
};

const plugins = [
  createPersistedState({
    key: "drivingSchool",
    storage: window.localStorage
  })
];

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins
});
