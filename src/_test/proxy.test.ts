import { createEnum, withZeroValue, negativeArray, range } from "../util/proxy";

test("proxy的简单应用", () => {
    const SHIRT_SIZES = createEnum({
        S: 10,
        M: 15,
        L: 20
    });
    console.log(SHIRT_SIZES.S);

    const hello = withZeroValue({ id: "1" }, "initalState");
    console.log(hello.apple);
    
    let apple = [1, 2, 3, 4, 5];
    console.log(negativeArray(apple)[-1]);

    const X = 10.5;
    const nums = [1, 5, X, 50, 100];
    // in操作符用于检查指定的属性是否位于指定的对象或其原型链中。
    nums.filter(n => n in range(1, 10)); // [1, 5]
    console.log(nums.filter(n => n in range(1, 10)))
})
