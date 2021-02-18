import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    themeColor: '#008cff'
  },
  mutations: {
    changeThemeColor(state,val){
      state.themeColor = val
    }
  },
  actions: {

  }
})
export default store