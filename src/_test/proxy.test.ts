import { createEnum } from "../util/proxy";
test("枚举类型的使用", () => {
    const SHIRT_SIZES = createEnum({
        S: 10,
        M: 15,
        L: 20
    });
    console.log(SHIRT_SIZES.S)
})