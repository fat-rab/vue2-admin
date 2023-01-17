import { submitErrorLog } from '@/api/sys-management'

const state = {}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    let str = sessionStorage.getItem('errlog')
    let errArr = []
    if (str) {
      errArr = JSON.parse(str)
    }
    errArr.push(log)
    // state.logs.push(log)
    str = JSON.stringify(errArr)
    sessionStorage.setItem('errlog', str)
  },
  CLEAR_ERROR_LOG: (state) => {
    sessionStorage.removeItem('errlog')
  }
}

const actions = {
  addErrorLog ({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  submitErrorLog ({ commit, state, dispatch }) {
    const str = sessionStorage.getItem('errlog')
    if (str) {
      const errArr = JSON.parse(str)
      // console.log(errArr, 'errArr')
      return new Promise((resolve, reject) => {
        submitErrorLog({ errorArr: errArr }).then(() => {
          dispatch('clearErrorLog')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  clearErrorLog ({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
