require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let vuex = {
  strict: true,
  state: {
    subjects: [{
      id: Date.now(),
      subjects: []
    }]
  },
  getters: {
    subjects: (state) => state.subjects
  },
  mutations: {
    addSubject: (state, subject) => {
      let index = state.subjects.find(i => i.id === subject.term)
      index.subjects.push(subject)
    },
    addTerm: (state) => {
      state.subjects.push({
        id: Date.now(),
        subjects: []
      })
    },
    removeSubject (state, subject) {
      let s = state.subjects.find(i => i.id === subject.term)
      let index = s.subjects.findIndex(i => i.id === subject.id)
      s.subjects.splice(index, 1)
    }
  },
  actions: {
    addSubject ({commit}, subject) {
      console.log(subject)
      commit('addSubject', subject)
    },
    addTerm ({commit}) {
      commit('addTerm')
    },
    removeSubject ({commit}, subject) {
      commit('removeSubject', subject)
    }
  }
}
export let store = new Vuex.Store(vuex)
export let mockStore = vuex
