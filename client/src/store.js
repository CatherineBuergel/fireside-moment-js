import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let baseUrl = window.location.host.includes('localhost') ? '//localhost:3000/api' : '/api'

let _api = Axios.create({
  baseURL: baseUrl
})

export default new Vuex.Store({
  state: {
    wiffles: [],
    comments: {
      /**
       * wiffleId's: [{comments with that wiffleId}]
       */
    }
  },
  mutations: {
    setWiffles(state, wiffles) {
      state.wiffles = wiffles
    },
    addWiffle(state, wiffle) {
      state.wiffles.unshift(wiffle)
    },
    removeWiffle(state, id) {
      state.wiffles.splice(state.wiffles.findIndex(w => w._id == id), 1)
    },
    addComment(state, comment) {
      if (!state.comments[comment.wiffleId]) {
        state.comments[comment.wiffleId] = []
      }
      Vue.set(state.comments, comment.wiffleId, [...state.comments[comment.wiffleId], comment])
    },
    setComments(state, comments) {
      if (comments.length) {
        Vue.set(state.comments, comments[0].wiffleId, comments)
      }
    }
  },
  actions: {
    //#region WIFFLES
    getWiffles({ commit }) {
      _api.get('wiffles')
        .then(res => {
          console.log(res)
          commit('setWiffles', res.data.wiffles)          
        })
    },
    postWiffle({ commit }, payload) {
      _api.post('wiffles', payload)
        .then(res => {
          commit('addWiffle', res.data)
        })
    },
    deleteWiffle({ commit }, id) {
      _api.delete('wiffles/'+id)
        .then(() => commit('removeWiffle', id))
    },
    //#endregion
    addComment({commit}, comment) {
      _api.post('comments', comment)
        .then(({ data: comment }) => commit('addComment', comment))
        .catch(e => console.error(e))
    },
    getComments({commit}, wiffleId) {
      _api.get('comments/'+wiffleId)
        .then(({ data: { comments } }) => commit('setComments', comments))
        .catch(e => console.error(e))
    }
  }
})
