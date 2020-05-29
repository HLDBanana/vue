import {
    Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/loading.css'

export const showLoading = (config) => {
    let configs = config || {}
    Loading.service(configs)
}

export const hideLoading = () => {
    let loadingInstance = Loading.service({})
    loadingInstance.close()
}

// 是否是PC端
export const isPC = () => {
    let userAgentInfo = window.navigator.userAgent
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'micromessenger']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

// 是否是PC端
export const isWeixin = () => {
    let ua = navigator.userAgent.toLowerCase()
    let isWx = ua.indexOf('micromessenger') !== -1
    return isWx
}

export const formatTime = (val, format) => {
    let t = new Date(val)
    let tf = (i) => {
        return (i < 10 ? '0' : '') + i
    }
    return format.replace(/yyyy|MM|dd|hh|mm|ss/g, (a) => {
        let mapper = {
            'yyyy': tf(t.getFullYear()),
            'MM': tf(t.getMonth() + 1),
            'dd': tf(t.getDate()),
            'hh': tf(t.getHours()),
            'mm': tf(t.getMinutes()),
            'ss': tf(t.getSeconds()),
        }
        return mapper[a]
    })
}

export const GetQueryString = (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) {
        return
    }
    unescape(r[2])
    return null
}

// 对象类型
export const typeOf = (obj) => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}

// 判断参数是否是其中之一
export const oneOf = (value, validList) => {
    for (var i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

// 深度拷贝
export const deepCopy = (data) => {
    const t = typeOf(data)
    let o

    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}

// 保留小数,data为数字，num为位数
export const retainDecimal = (data, num = 2) => {
    let datas = String(data)
    if (datas.indexOf('.') > -1) {
        if (datas.length - datas.indexOf('.') < num) {
            return datas + '.' + '0'.repeat(datas.length - datas.indexOf('.'))
        } else {
            return Number(datas).toFixed(num)
        }
    } else {
        return datas + '.' + '0'.repeat(num)
    }
}

/* eslint-disable */
// 返回非空的数组
Array.prototype.notempty = function () {
    return this.filter(t => t != undefined && t !== null)
}
/* eslint-disable no-new */

export const unique = (arr) => {
    return Array.from(new Set(arr))
}
// 返回数组中关键字的数组,separator不为空时返回separator拼接的字符串 nullFlag当为true时，也返回空的数组如["","aa","bb"]
export const getKeyValByArr = (arrObj, key, separator, nullFlag) => {
    if (typeOf(arrObj) !== 'array' || key === '') {
        return separator ? '' : []
    }
    var tmp = arrObj.map(function (item) {
        if (item[key] !== undefined && item[key] != null) {
            return item[key]
        } else if (nullFlag) {
            return ''
        }
    })
    tmp = tmp.notempty()
    if (separator) {
        return tmp.join(separator)
    } else {
        return tmp
    }
}
// 除法
export const accDiv = (arg1, arg2) => {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {};
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {};
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return accMul((r1 / r2), Math.pow(10, t2 - t1));
}

//乘法
export const accMul = (arg1, arg2) => {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {};
    try {
        m += s2.split(".")[1].length
    } catch (e) {};
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//加法
export const accAdd = (arg1, arg2) => {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    };
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    };
    m = Math.pow(10, Math.max(r1, r2));
    return (accMul(arg1, m) + accMul(arg2, m)) / m;
}
//减法
export const subtr = (arg1, arg2) => {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    };
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    };
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    // return ((arg1*m-arg2*m)/m).toFixed(n);
    return ((accMul(arg1, m) - accMul(arg2, m)) / m).toFixed(n);
}
export const deepClone = function(target) {
  let result
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = []
      for (let i in target) {
        result.push(deepClone(target[i]))
      }
    } else if (target === null) {
      result = null
    } else if (target.constructor === RegExp){
      result = target
    } else {
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
  } else {
    result = target
  }
  return result;
}
// 简化console.log
export const log = console.log.bind(console)
export const upperCaseFirstCharactor = function (string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1)
}
