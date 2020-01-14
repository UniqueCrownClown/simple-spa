import aop from "../util/simpleAop";
class Test {
    constructor() {
    }
    public test() {
        console.log("我是一个没有感情的工具人")
    }
}

test('测试aop before', () => {
    aop.before(Test, 'test', (joinPoint, result, error) => {
        console.log(joinPoint);
        console.log('在test方法执行前执行');
    });
    let apple = new Test();
    apple.test();
})
test('测试aop after', () => {
    aop.after(Test, 'test', (joinPoint, result, error) => {
        console.log(joinPoint)
        console.log('在test方法执行后执行');
    });
    let apple = new Test();
    apple.test();
})

// aop.afterThrow(Test, 'test', (joinPoint, error) => {
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
