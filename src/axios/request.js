import service from '@/axios'
import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/message.css'
import getEnv from '@/config'
import {getToken, removeToken} from '@/utils/auth'
// post请求
export const request = (url, data, config) => {
  let postData = data
  let configs = config
  if (!configs.notNeedToken) {
    if (!getToken()) {
      Message.error('登录信息已失效,请重新登录!')
      window.location.href = getEnv() === 'localhost' ? `${window.location.origin}/#/login` : window.location.origin
      return
    }
    // crm的接口data里写好token，新接口请求头自动配置token
    let dataHaveToken
    if (typeof postData === 'string') {
      dataHaveToken = postData.indexOf('access_token') !== -1
    } else {
      dataHaveToken = false
    }
    // 配置请求头里的token
    if (dataHaveToken === false) {
      if (!config.headers) {
        config.headers = {}
      }
      if (!config.headers.access_token) {
        config.headers.access_token = getToken()
      }
    }
  }
  return new Promise((resolve, reject) => {
    service.post(url, postData, configs).then((res) => {
      if (res.data.isLogOut && res.data.isLogOut === 1) {
        Message.error('登录信息已失效,请重新登录!')
        console.log('登录信息已失效,请重新登录! (removeToken)')
        removeToken()
        window.location.href = getEnv() === 'localhost' ? `${window.location.origin}/#/login` : window.location.origin
        return
      }
      resolve(res.data)
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message)
      } else {
        reject(e)
        Message.error('请求异常')
      }
    })
  })
}

// get请求
export const getData = (url, config) => {
  let configs = config
  if (!configs.notNeedToken) {
    if (!getToken()) {
      Message.error('登录信息已失效,请重新登录!')
      window.location.href = getEnv() === 'localhost' ? `${window.location.origin}/#/login` : window.location.origin
      return
    }
  }
  return new Promise((resolve, reject) => {
    service.get(url, configs).then((res) => {
      if (res.data.isLogOut && res.data.isLogOut === 1) {
        Message.error('登录信息已失效,请重新登录!')
        console.log('登录信息已失效,请重新登录! (removeToken)')
        removeToken()
        window.location.href = getEnv() === 'localhost' ? `${window.location.origin}/#/login` : window.location.origin
        return
      }
      resolve(res.data)
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message)
      } else {
        reject(e)
        Message.error('请求异常')
      }
    })
  })
}

// 上传七牛云请求
export const qiniuUpload = (url, data, config) => {
  let postData = qs.stringify({...data})
  let configs = {...config}
  return new Promise((resolve, reject) => {
    service.post(url, qs.stringify(postData), configs).then((res) => {
      if (res.data.isLogOut && res.data.isLogOut === 1) {
        Message.error('登录信息已失效,请重新登录!!')
        removeToken()
        window.location.href = getEnv() === 'localhost' ? `${window.location.origin}/#/login` : window.location.origin
        return
      }
      resolve(res.data)
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message)
      } else {
        reject(e)
        Message.error('请求异常')
      }
    })
  })
}

// 表格导出请求
export const downLoadList = (url, data, callback) => {
  let formData = data || {}
  formData.access_token = getToken()
  let form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  let body = document.getElementsByTagName('body')[0]
  body.appendChild(form)
  for (var i in formData) {
    let input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', i)
    input.setAttribute('value', formData[i])
    form.appendChild(input)
  }
  form.submit()
  body.removeChild(form)
  callback && callback()
}
