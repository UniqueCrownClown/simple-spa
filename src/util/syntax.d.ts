// 联合类型 --------- `|`
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法


// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}


// 字符串字面量类型

type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); 
// 报错，event 不能为 'dbclick'



// 元组
// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

let tom: [string, number] = ['Tom', 25];


// es6 class 存取器

class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack


// 一个类可以实现多个接口

interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    public alert() {
        console.log('Car alert');
    }
    public lightOn() {
        console.log('Car light on');
    }
    public lightOff() {
        console.log('Car light off');
    }
}

// 接口继承接口

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}

// 接口继承类
class Point {
    public x: number;
    public y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };

// 可变参数
// ...restOfname:string[]  这个写法就是可变参数的写法
const peopleName = (firstName: string, ...restOfname: string[])=> {
    console.log(firstName, restOfname);
}

// 单个泛型---T
// 两个泛型---T, U

// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
// 泛型约束

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 泛型类

class GenericNumber<T> {
    public zeroValue: T;
    public add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };


// 泛型接口
// interface CreateArrayFunc {
//     <T>(length: number, value: T): T[];
// }
declare type CreateArrayFunc = <T>(length: number, value: T) => T[];
let createArray: CreateArrayFunc;

createArray = function <T>(length: number, value: T): T[] {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']


// 泛型参数的默认类型

function createArrayX<T = string>(length: number, value: T): T[] {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}


