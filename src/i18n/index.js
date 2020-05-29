import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { lang } from './common/lang.js'

Vue.use(VueI18n) // 通过插件的形式挂载

let messages = {} // 取出对应的语言包

for (let k in lang) {
  messages[k] = lang[k].value
}

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  messages
})

export default i18n
