/**
 * 时间戳转过去式时间
 * @param {Number/String} timestamp 时间戳
 */
export const changeTime = (timestamp) => {
  let currentUnixTime = Math.round((new Date()).getTime() / 1000);
  let deltaSecond = currentUnixTime - parseInt(timestamp, 10);
  let result;
  if (deltaSecond < 60) {
    result = deltaSecond + '秒前';
  } else if (deltaSecond < 3600) {
    result = Math.floor(deltaSecond / 60) + '分钟前';
  } else if (deltaSecond < 86400) {
    result = Math.floor(deltaSecond / 3600) + '小时前';
  } else {
    result = Math.floor(deltaSecond / 86400) + '天前';
  }
  return result;
}

/**
 * 时间戳转日期格式
 * @param {Number/String} timestamp 时间戳
 */
export const formatTime = timestamp => {
  const date = new Date(timestamp*1000);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
