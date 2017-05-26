import Vue from 'vue'
import Vuex from 'vuex'
import Home from '@/pages/Home'
import {mockStore} from '../../../src/store'
describe('Home.vue', () => {
  it('should render correct addSubject', (done) => {
    const Constructor = Vue.extend(Home)
    let store = new Vuex.Store(mockStore)
    const vm = new Constructor({store}).$mount()
    vm.addNewSubject('JAVA', 90, 3)
    Vue.nextTick(() => {
      expect(vm.subjects.length).to.eql(1)
      done()
    })
  })
})
