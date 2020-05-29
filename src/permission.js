import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import {getMenuList, getAllMenuList} from "@/services";
import qs from 'qs'
import {userInfoGet} from '@/services'
import i18n from '@/i18n'
import getPageTitle from '@/utils/get-page-title'

// 配置语言(默认用浏览器语言)
const getLanguage = function(l) {
  let language = l
  let mapper = {
    'zh': 'zh-CN',
    'en': 'en-US',
    'ja': 'ja-JP',
  }
  if (!language) {
    i18n.locale = (navigator.language || navigator.userLanguage)
  } else {
    i18n.locale = mapper[language]
  }
}

let dataStatisticsId = ''
let codesObj = {}
// 获取数据统计项目的ID
async function getDataStatisticsId() {
  let obj = {
    access_token: getToken()
  }
  await getMenuList(qs.stringify(obj)).then(res => {
    if (res.result === 1) {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].code === 18) { // 数据统计 code 为 18
          dataStatisticsId = res.data[i].id
        }
      }
    } else {
      this.$message.error(res.msg)
    }
  }).catch(err => {
    console.log('err', err)
  })
}
// 接受ID参数，获取其下级列表
async function getAllMenuListOrg(id) {
  let obj = {
    params: {
      menuId: id, // 数据统计id
    },
    headers: {'access_token': getToken()}
  }
  await getAllMenuList(obj).then(res => {
    if (res.code === 1) {
      res.data.forEach(e => {
        codesObj[String(e.code)] = e.id
      })
    } else {
      this.$message.error(res.msg)
    }
  }).catch(err => {
    console.log('err', err)
  })
}
// 获取由code组成的obj（有权限进入的页面的code）
async function getCanEnterPagesArr() {
  await getDataStatisticsId()
  await getAllMenuListOrg(dataStatisticsId)
}

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)
  document.title = 'PowerNow Managerment'

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // console.log('window.location.host.includes(\'localhost\')', window.location.host.includes('localhost'))
      if (window.location.host.includes('localhost')) {
        next()
      } else {
        next({path: '/'})
        NProgress.done()
      }
    } else {
      let obj = {
        access_token: getToken()
      }
      // 获取语言
      userInfoGet(qs.stringify(obj)).then((res) => {
        if (res.result === 1) {
          getLanguage(res.data.language)
        } else {
          this.$message.error(res.msg)
        }
      })
      // 根据用户权限动态添加路由
      if (store.state.permission.addRouters.length === 0) {
        await getCanEnterPagesArr()
        // 生成可访问的路由表
        const accessRoutes = await store.dispatch('permission/GenerateRoutes', codesObj)
        // 动态添加可访问路由表
        router.addRoutes(accessRoutes)
        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        next({...to, replace: true})
      } else {
        next()
      }
    }
  } else {
    if (window.location.host.includes('localhost') === false && window.location.host.includes('192.168.0.17') === false) {
      window.location.href = `${window.location.origin}/#/login`
    }
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  window.scrollTo(0, 0)
  // console.log('afterEach')
  NProgress.done()
})
