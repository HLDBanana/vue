function getEnv() {
  const url = window.location.host
  let env
  if (/^maintain.powernow.jp/.test(url)) {
    env = 'prodJapan'
  } else if (/^maintain.powernow.asia/.test(url)) {
    env = 'prodSingapore'
  } else if (/^39.105.33.42/.test(url)) {
    env = 'test'
  } else if (/^localhost/.test(url) || /^192.168.0.17/.test(url)) {
    env = 'local'
  }
  return env
}

let platformUrl
if (getEnv() === 'prodJapan') {
  platformUrl = 'http://maintain.powernow.jp' // 日本
} else if (getEnv() === 'prodSingapore') {
  platformUrl = 'http://maintain.powernow.asia' // 新加坡
} else if (getEnv() === 'test') {
  platformUrl = 'http://39.105.33.42' // 测试
} else if (getEnv() === 'local') {
   //platformUrl = 'http://maintain.powernow.asia' // 新加坡
  platformUrl = 'http://39.105.33.42' // 测试
}
export {
  getEnv,
  platformUrl,
}
