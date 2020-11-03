!非空断言操作符

1.1 忽略undefined和null类型

```
function myFunc(maybeString: string|undefined|null) {
// Type 'string|null|undefined' is not assignable to type 'string'.
// Type 'undefined' is not assignable to type  'string'
const onlyString:string = maybeString;// Error
const ignoreUndefinedAndNull: string = maybeString!; //ok
}
```

1.2 调用函数时忽略undefined类型



```
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}

```

1.3 确定赋值断言

```
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```

2 ?.运算符

支持语法

```
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)
```

例子

```
const val = a?.b;
// 编译生成es5代码
var val = a ===null||a===void 0?void 0:a.b;
会自动检查对象 a 是否为 null 或 undefined，如果是的话就立即返回 undefined，这样就可以立即停止某些表达式的运行。你可能已经想到可以使用 ?. 来替代很多使用 && 执行空检查的代码

if(a && a.b) { } 

if(a?.b){ }
```





































