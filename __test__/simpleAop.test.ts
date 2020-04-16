// import aop from "src/util/simpleAop";
// 可以用装饰器进行封装
class Test {
    private apple: string;
    constructor() {
        this.apple = "apple";
    }
    public test () {
        alert(this.apple + "我是一个没有感情的工具人")
    }
}

// 等同于

// Test.prototype = {
//     test() {
//         console.log(this.apple)
//     }
// };



// aop.before(Test, 'test', (joinPoint) => {
//     let { target, method, args, self } = joinPoint;
//     console.log(
//         target, method, args, self
//     )
//     console.log('test方法将被执行');
// });

// aop.afterThrow(Test, 'test', (joinPoint, error) => {
//     let { target, method, args, self } = joinPoint;
//     console.log(
//         target, method, args, self
//     )
//     console.log('test方法将被执行');
// });

// aop.after(Test, 'test', (joinPoint, result, error) => {
//     let { target, method, args, self } = joinPoint;
//     console.log(
//         target, method, args, self
//     )
//     console.log('test方法将被执行');
// });

// aop.afterReturn(Test, 'test', (joinPoint, result) => {
//     let { target, method, args, self } = joinPoint;
//     console.log(
//         target, method, args, self
//     )
//     console.log('test方法将被执行');
// });

