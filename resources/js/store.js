import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
        setToken(state, token){
            state.token = token
        },
        destroToken(state) {
            state.token = null
        },
    },
    actions:{
        login(context, payload){
            return new Promise((resolve, reject) => {
                axios.post('/api/login', {
                    email: payload.email,
                    password: payload.password,
                })
                .then(res => {
                    const token = res.data.access_token
                    // console.log(res.data)
                    localStorage.setItem('access_token', token)
                    context.commit('setToken', token)
                    resolve(res) 
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        logout(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                  axios.post('/api/logout')
                    .then(response => {
                      localStorage.removeItem('access_token')
                      context.commit('destroyToken')
                      resolve(response)
                    })
                    .catch(error => {
                      localStorage.removeItem('access_token')
                      context.commit('destroyToken')
                      reject(error)
                    })
                })
            }
        }
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
    }
});

export default store;