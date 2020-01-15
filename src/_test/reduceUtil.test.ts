import { groupBy } from "../util/reduce";
import { observe, observable } from "../util/compose"
const apple = [{ id: "xiao", name: "xiao", type: "aa" }, { id: "da", name: "da", type: "bb" }, { id: "middle", name: "middle", type: "aa" }];
test("测试reduce的使用", () => {
    console.log(groupBy(apple, "type"))
})

//观察者测试

test("simple observer", () => {

    let data = {
        name: 'jackie',
        age: 30
    };

    //对data属性进行监听
    const person = observable(data);

    function print() {
        console.log(`${person.name}, ${person.age}`);
    }

    //print作为监听触发的回调函数
    observe(print);

    person.name = 'world';
})