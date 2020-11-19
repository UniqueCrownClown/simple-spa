// Promise 中的三兄弟 .all(), .race(), .allSettled()
// Promise.all()短路特性
// Promise.allSettled()方法返回一个promise，该promise在所有给定的promise已被解析或被拒绝后解析，并且每个对象都描述每个promise的结果。
// 举例说明, 比如各位用户在页面上面同时填了3个独立的表单, 这三个表单分三个接口提交到后端, 三个接口独立, 没有顺序依赖, 
// 这个时候我们需要等到请求全部完成后给与用户提示表单提交的情况
// 在多个promise同时进行时咱们很快会想到使用Promise.all来进行包装, 
// 但是由于Promise.all的短路特性, 三个提交中若前面任意一个提交失败, 则后面的表单也不会进行提交了, 这就与咱们需求不符合.
// Promise.allSettled跟Promise.all类似, 
// 其参数接受一个Promise的数组, 返回一个新的Promise, 
// 唯一的不同在于, 其不会进行短路, 也就是说当Promise全部处理完成后我们可以拿到每个Promise的状态, 而不管其是否处理成功.
function resolveAfter(ms, value = undefined) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), ms);
    });
}
function timeout(timeoutInMs, promise) {
    return Promise.race([
        promise,
        resolveAfter(timeoutInMs,
            Promise.reject(new Error('Operation timed out'))),
    ]);
}