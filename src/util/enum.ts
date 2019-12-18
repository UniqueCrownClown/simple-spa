// 默认情况下，枚举是基于 0 的，也就是说第一个值是 0，后面的值依次递增
// 每一个值都可以显式指定，只要不出现重复即可，没有被显式指定的值，都会在前一个值的基础上递增。
enum Color {Red, Green, Blue}
let c: Color = Color.Green;  // 1
let colorName1: string = Color[1];  // 'Green'
let colorName2: string = Color[Color.Green];  // 'Green'
