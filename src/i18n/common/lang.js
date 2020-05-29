import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import jaLocale from 'element-ui/lib/locale/lang/ja'
export const lang = {
  'zh-CN': {
    title: '中文',
    locale: 'zh-CN',
    value: { ...require('./lang/zh'), ...zhLocale }
  }, // 中文语言包
  'en-US': {
    title: 'English',
    locale: 'en-US',
    value: { ...require('./lang/en'), ...enLocale }
  }, // 英文语言包
  'ja-JP': {
    title: 'Japanese',
    locale: 'ja-JP',
    value: { ...require('./lang/ja'), ...jaLocale }
  }, // 日文语言包
}
