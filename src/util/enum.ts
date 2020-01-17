// 默认情况下，枚举是基于 0 的，也就是说第一个值是 0，后面的值依次递增
// 每一个值都可以显式指定，只要不出现重复即可，没有被显式指定的值，都会在前一个值的基础上递增。
enum Color { Red, Green, Blue }
let c: Color = Color.Green;  // 1
let colorName1: string = Color[1];  // 'Green'
let colorName2: string = Color[Color.Green];  // 'Green'

// 数据枚举和字符串枚举
enum Message {
    Success = "成功",
    Fail = "失败"
}


// Reflect.get的基本使用test
const xxx = () => {
    let objxx = { x: 1, y: 2 }
    Reflect.get(objxx, 'x')  // 1

    // Array
    Reflect.get(['zero', 'one'], 1)  // "one"

    // Proxy with a get handler
    let x = { p: 1 }
    let obj = new Proxy(x, {
        get(t, k, r) { return k as string + 'bar' }
    })
    Reflect.get(obj, 'foo')  // "foobar
}


// Reflect对象
// 1. 修改某些object方法的返回值
// Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false

// 2. 让某些命令式的Object操作变成函数式 
// 比如name in obj和delete obj[name],而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

// 3. Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础

// 4. Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。
// 未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。


// 循环一个类数组对象
var listMap = function (array, type, fn) {
    return !fn ? array : Array.prototype[type]["call"](array, fn)
};
var divs = document.querySelectorAll("div");
listMap(divs, "forEach", function (e) {
    console.log(e)
});

// 判断数据类型简单封装

export const type = (data) => {
    var toString = Object.prototype.toString;
    var dataType =
        data instanceof Element
            ? "element" // 为了统一DOM节点类型输出
            : toString
                .call(data)
                .replace(/\[object\s(.+)\]/, "$1")
                .toLowerCase()
    return dataType
};

// 在Javascript函数参数个数是不固定的, 即使他们不等于声明函数参数的数量。缺少的参数被当做undefined的和多余的参数会被忽略
// function foo(x, y) {
//     console.log(x);
//     console.log(y);
// }

// foo(1, 2);      // logs 1, 2
// foo(1);         // logs 1, undefined
// foo(1, 2, 3);   // logs 1, 2

[1, 2, 3, 4, 5].map(console.log);
// 等价于
[1, 2, 3, 4, 5].map(
    (val, index, array) => console.log(val, index, array)
);
// 不等价于
[1, 2, 3, 4, 5].map(
    val => console.log(val)
);





