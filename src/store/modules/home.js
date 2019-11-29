// home状态对象
const state = {
  test: "a test",
  urlParamStr: ""
};

// 修改
const mutations = {
  SET_TEST: (state, val) => {
    state.test = val;
  },
  SET_UrlParamStr(state, val) {
    state.urlParamStr = val;
  }
};

// 异步修改
const actions = {
  setTest({ commit }, val) {
    commit("SET_TEST", val);
  }
  // setUrlParamStr({ commit }, val) {
  //   commit("SET_UrlParamStr", val);
  // }
};

// home vuex模块导出
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
