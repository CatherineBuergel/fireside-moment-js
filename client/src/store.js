import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let baseUrl = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let _api = Axios.create({
  baseURL: baseUrl+'api/wiffles'
})

export default new Vuex.Store({
  state: {
    wiffles: []
  },
  mutations: {
    setWiffles(state, wiffles) {
      state.wiffles = wiffles
    },
    addWiffle(state, wiffle) {
      state.wiffles.unshift(wiffle)
    }
  },
  actions: {
    getWiffles({commit}) {
      _api.get('')
        .then(res => {
          console.log(res)
          commit('setWiffles', res.data.wiffles)          
        })
    },
    postWiffle({commit}, payload) {
      _api.post('', payload)
        .then(res => {
          commit('addWiffle', res.data)
        })
    }
  }
})
