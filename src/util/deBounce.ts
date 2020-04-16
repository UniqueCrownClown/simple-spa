// 防抖函数
export const debounce = (func, delay: number) => {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 节流函数
export const throttle = (func, delay: number) => {
  let now = Date.now()
  return function (...args) {
    const current = Date.now()
    if (current - now >= delay) {
      func.apply(this, args)
      now = current
    }
  }
}