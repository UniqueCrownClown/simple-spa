// 对象默认值设置
export const withZeroValue = (target: any, zeroValue: any) =>
    new Proxy(target, {
        get: (obj, prop) => (prop in obj ? obj[prop] : zeroValue)
    });
// 数组方向下标访问
export const negativeArray = (els: any) =>
    new Proxy(els, {
        get: (target, propKey: number, receiver) =>
            Reflect.get(
                target,
                +propKey < 0 ? String(target.length + +propKey) : propKey,
                receiver
            )
    });
// 只读视图
const NOPE = () => {
    throw new Error("Can't modify read-only view");
};

const NOPE_HANDLER = {
    set: NOPE,
    defineProperty: NOPE,
    deleteProperty: NOPE,
    preventExtensions: NOPE,
    setPrototypeOf: NOPE
};

export const readOnlyView = (target: any) => new Proxy(target, NOPE_HANDLER);

// 枚举

export const createEnum = (target: any) => new Proxy(target, {
    get: (obj, prop) => {
        if (prop in obj) {
            return Reflect.get(obj, prop);
        }
        throw new ReferenceError(`Unknown prop "${String(prop)}"`);
    }
})

