import aop from "src/util/simpleAop";
class Test {
    constructor() {
    }
    public test() {
        alert("我是一个没有感情的工具人")
    }
}



aop.before(Test, 'test', (joinPoint) => {
    let { target, method, args, self } = joinPoint;
    console.log(
        target, method, args, self
    )
    console.log('test方法将被执行');
});

aop.afterThrow(Test, 'test', (joinPoint, error) => {
    let { target, method, args, self } = joinPoint;
    console.log(
        target, method, args, self
    )
    console.log('test方法将被执行');
});

aop.after(Test, 'test', (joinPoint, result, error) => {
    let { target, method, args, self } = joinPoint;
    console.log(
        target, method, args, self
    )
    console.log('test方法将被执行');
});

aop.afterReturn(Test, 'test', (joinPoint, result) => {
    let { target, method, args, self } = joinPoint;
    console.log(
        target, method, args, self
    )
    console.log('test方法将被执行');
});

