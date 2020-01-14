import { groupBy } from "../util/reduce";
const apple = [{ id: "xiao", name: "xiao",type:"aa"},{ id: "da", name: "da",type:"bb" },{ id: "middle", name: "middle",type:"aa" }];
test("测试reduce的使用", () => {
    console.log(groupBy(apple, "type"))
})