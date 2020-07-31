import { groupBy } from "../util/reduce";
import { observe, observable, EventEmitter } from "../util/compose";

import { compose } from "../util/compose";

const apple = [{ id: "xiao", name: "xiao", type: "aa" }, { id: "da", name: "da", type: "bb" }, { id: "middle", name: "middle", type: "aa" }];
test("测试reduce的使用", () => {
    console.log(groupBy(apple, "type"))
})
// 函数式调用
test("测试简单的compose", () => {
    const sss = (str: string) => {
        return str + "apple is good";
    }
    const bFn = (str: string) => {
        return str.concat(",peach is good too")
    }
    const xxxx = compose(bFn,sss)("fruit:");
    console.log(xxxx);
});
// 观察者测试

test("simple observer", () => {

    const data = {
        name: 'jackie',
        age: 30
    };

    // 对data属性进行监听
    const person = observable(data);

    const print = () => {
        console.log(`${person.name}, ${person.age}`);
    }

    // print作为监听触发的回调函数
    observe(print);

    person.name = 'world';
})

// 发布订阅测试
const aFn = (content: string) => {
    console.log("callback" + content);
}
test("hello emit!!", () => {
    EventEmitter.on("apple", aFn);
    EventEmitter.emit("apple", "helloWrold11!!");
    EventEmitter.off("apple", aFn);
    EventEmitter.emit("apple", "helloWrold122!!");
    EventEmitter.once("peach", (content: string) => {
        console.log("once callback" + content);
    });
    EventEmitter.emit("peach", "helloWrold33!!");
    EventEmitter.emit("peach", "helloWrold44!!");
})