import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
        retrieveToken(state, token){
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
    },
    actions:{
        register(context, payload){
            return new Promise((resolve, reject) => {
                axios.post('/api/register', {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password
                })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        login(context, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/login', {
                  email: credentials.email,
                  password: credentials.password,
                })
                  .then(response => {
                    const token = response.data.access_token
        
                    localStorage.setItem('access_token', token)
                    context.commit('retrieveToken', token)
                    resolve(response)
                  })
                  .catch(error => {
                    reject(error)
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