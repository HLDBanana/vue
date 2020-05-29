import axios from 'axios'
import { platformUrl } from '@/config'
import { showLoading, hideLoading } from '@/utils/common'

// 创建axios实例
const service = axios.create({
    baseURL: platformUrl, // api的base_url
    timeout: 60000 // 请求超时时间
})

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken
let removePending = (ever) => {
    for (let p in pending) {
        if (pending[p].u === ever.url + '&' + ever.method) { // 当当前请求在数组中存在时执行函数体
            pending[p].f() // 执行取消操作
            pending.splice(p, 1) // 把这条记录从数组中移除
        }
    }
}

// axios的拦截器配置
service.interceptors.request.use((config) => { // 配置发送请求的信息
    if (!config.noloading) {
        showLoading({
            text: '拼命加载中...'
        })
    }
    if (!config.isNoCancel) {
        removePending(config) // 在一个ajax发送前执行一下取消操作
        config.cancelToken = new cancelToken((c) => { // eslint-disable-line
            // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
            pending.push({ u: config.url + '&' + config.method, f: c })
        })
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

service.interceptors.response.use((response) => { // 配置请求回来的信息
    // respone拦截器 判断返回code 添加提示
    if (!response.config.noloading) {
        hideLoading()
    }
    if (!response.config.isNoCancel) {
        removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    }
    return response
}, (error) => {
    hideLoading()
    return Promise.reject(error)
})

export default service
