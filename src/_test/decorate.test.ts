/* tslint:disable:max-classes-per-file */
// 类装饰
test("装饰器1", () => {
    function testable1(target) {
        // target就是装饰的class
        target.isTestable = true;
    }
    @testable1
    class MyTestableClass {
        public static isTestable: any;
        // ...
    }
    console.log(MyTestableClass.isTestable);
})
test("装饰器2", () => {
    const testable2 = (isTestable) => {
        return (target) => {
            target.isTestable = isTestable;
        }
    }
    @testable2(false)
    class MyTestableClass {
        public static isTestable: any;
        // ...
    }
    console.log(MyTestableClass.isTestable);
})
export const mixins = (...list: any[]) => {
    return (target) => {
        Object.assign(target.prototype, ...list)
    }
}

test("对象方法注入到class实例中", () => {
    const xoo = {
        foo() { console.log('fooConsole') }
    };
    @mixins(xoo)
    class MyClass {
        public foo() {
            throw new Error("Method not implemented.");
        }
    }
    const obj = new MyClass();
    obj.foo()
})

// 方法装饰

test("对象方法注入到class实例中", () => {
    const readonly = (target, name, descriptor) => {
        // descriptor对象原来的值如下
        // {
        //   value: specifiedFunction,
        //   enumerable: false,
        //   configurable: true,
        //   writable: true
        // };
        descriptor.writable = false;
        return descriptor;
    }
    class Person {
        public first: any;
        public last: any;
        @readonly
        public name() { return `${this.first} ${this.last}` }
    }
})


test("输出日志的作用aop", () => {
    class Math {
        @log
        public add(a, b) {
            return a + b;
        }
    }

    const log = (target, name, descriptor) => {
        const oldValue = descriptor.value;

        descriptor.value = (...xxx) => {
            console.log(`Calling ${name} with`, xxx);
            return oldValue.apply(this, xxx);
        };

        return descriptor;
    }

    const math = new Math();

    // passed parameters should get logged now
    math.add(2, 4);
})