declare type IComposeFn = (...args: any) => any;
export const compose = (...fns: IComposeFn[]) => {
  // const fns: Array<any> = [].slice.call(args);
  // return function (initialArg: any) {
  //   let res = initialArg
  //   for (let i = fns.length - 1; i > -1; i--) {
  //     res = fns[i](res)
  //   }
  //   return res
  // }
  const length = fns.length;
  return function (this: any, ...args: any[]) {
    let index = length - 1;
    let result = length > 0 ? fns[index].apply(this, args) : args; // 注意arg为数组，要用apply
    while (--index >= 0) {
      result = fns[index].call(this, result);
    }
    return result
  }
};

// 观察者模式

const queuedObservers = new Set();

export const observe = fn => queuedObservers.add(fn);
export const observable = obj => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer: any) => observer());
  return result;
}

// 发布订阅模式
export const EventEmitter: any = {

  list: {},
  // 订阅
  on(event, fn) {
    const _this = this;
    (_this.list[event] || (_this.list[event] = [])).push(fn);
    return _this;
  },
  off(event, fn) {
    const _this = this;
    const fns = _this.list[event];
    if (!fns) {
      return false;
    }
    if (!fn) {
      // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
      if(fns){
        fns.length = 0;
      }
    } else {
      // if (fns && fns.includes(fn)) {
      //   fns.splice(fns.findIndex(item => item === fn || item.fn === fn), 1);
      // }
      // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
      let cb;
      for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
        cb = fns[i];
        // 兼容once
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1);
          break
        }
      }
    }
    return _this;
  },
  once(event, fn) {
    // 调用后删除怎么实现
    const _this = this;
    function on() {
      _this.off(event, on);
      fn.apply(_this, arguments)
    }
    on.fn = fn;
    _this.on(event, on);
    return _this;
  },
  // 发布
  emit(...args: any[]) {
    const _this = this;
    const event = [].shift.call(args);
    const fns = [..._this.list[event]];
    if (!fns || fns.length === 0) {
      return false;
    }
    // 遍历 event值对应的缓存列表，依次执行fn
    const haha = args;
    fns.forEach(fn => {
      fn.apply(_this, haha);
    });
    return _this;
  }



};