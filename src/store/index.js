import Vue from 'vue';
import Vuex from 'vuex';
import Api from '../api/index';
import { login } from '../api/api'

Vue.use(Vuex)
Vue.prototype.$api = Api;
const store = new Vuex.Store({
  state: {
    isLogin: true,
    name: '',
    user: JSON.parse(localStorage.getItem('userInfo')) || '', // 先去localStorage中获取数据,
    roles: ['教师']
  },
  mutations: {
    set_isLogin (state, flag) {
      state.isLogin = flag
    },
    set_name (state, name) {
      state.name = name;
    },
    set_User (state, user) {
      state.user = user;
    },
    set_Role (state, roles) {
      state.roles = roles;
    },
    logout (state) {
      localStorage.setItem('userInfo', '');
      state.isLogin = false;
      state.roles = [];
      state.name = ''
    }
  },
  actions: {
    Login ({commit}, user) {
      return new Promise((resolve, reject) => {
        // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
        login(user)
          .then(res => {
            commit('set_name', res.data.username)
            commit('set_User', res.data)
            const identity = res.data.identity
            if (identity === 0) {
              commit('set_Role', '学生')
            }
            if (identity === 1) {
              commit('set_Role', '教师')
            }
            localStorage.setItem('userInfo', JSON.stringify(res.data));
           /*  localStorage.setItem('isLogin', 'True') */
            // 每次请求接口时，需要在headers添加对应的Token验证
        //    axios.defaults.headers.common['Authorization'] = token
            // 更新token
            commit('set_isLogin', true)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('logout')
      })
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    auth: state => state.auth
  }
});

export default store;
