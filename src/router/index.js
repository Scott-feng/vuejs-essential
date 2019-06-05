import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'
Vue.use(Router)


const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  // 获取仓库里的登录信息
  const app = router.app
  const store = app.$options.store
  const auth = store.state.auth

// 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId

  app.$message.hide()

  if ((auth && to.path.indexOf('/auth/') !== -1) ||
    (!auth && to.meta.auth) || (articleId && !store.getters.getArticleById(articleId)) ){
    // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
    next('/')
  } else {
    next()
  }
})

// 注册全局后置钩子
router.afterEach((to, from) => {
  const app = router.app
  const store = app.$options.store
  const showMsg = to.params.showMsg

  if (showMsg) {
    if (typeof showMsg === 'string') {
      app.$message.show(showMsg)
    } else {
      app.$message.show('操作成功')
    }
  }
})

export default router
