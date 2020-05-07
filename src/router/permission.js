import router from './index'
import store from '../store/index'

router.beforeEach((to, from, next) => {
  alert(223)
  let isLogin = store.state.isLogin
  if (isLogin === true) {
    let role = store.state.roles
    if (role === to.meta.roles[0] || role === to.meta.roles[1]) { /* 如果在有登录状态的情况下前往不需要权限的路由路径，则判定为退出登录，进行提示并跳转登录页 */
      next()
    } else {
      alert('权限不够')
    }
  } else {
      next()
  }
  /* let isLogin = localStorage.getItem('Flag') /!* 这里是判断用户是否登录过，因为在用户登录后会在localStroage内存储Flag=isLogin *!/
  if (getFlag === 'isLogin') { /!* 如果存在Flag并且为isLogin意味着用户登录，这时修改vux内state下isLogin的状态 *!/
    store.state.isLogin = true
    next()
    if (!to.meta.isLogin) { /!* 如果在有登录状态的情况下前往不需要权限的路由路径，则判定为退出登录，进行提示并跳转登录页 *!/
      alert('退出成功')
      next({
        path: '/login'
      })
    }
  } else {
    if (to.meta.isLogin) { /!* 如果没有登录状态且要去往需要权限的路径时跳转登录页并进行提示 *!/
      next({
        path: '/login',
        query: {redirect: '/'}
      })
    } else {
      next()
    }
  } */
})

router.afterEach(route => {
 // window.scroll(0, 0)
})
