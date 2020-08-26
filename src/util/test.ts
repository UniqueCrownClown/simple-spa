// 1. 求数组的所有奇数翻倍的累加和

// filter,,,map,,,reduce

const nums = [1, 2, 3, 4, 5, 6, 7, 8];

const isOdd = num => num % 2 !== 0;

const double = num => num * 2;

const add = (sum, num) => sum += num;

const result = nums.reduce(
    (sum, num) =>
        isOdd(num) ?
            add(sum, double(num)) : sum,
    0
);

console.log(result);


// 2. 用策略模式优化if else循环
// 把switch的type封装成对象的key








// 3. 斐波那契数列实现

// 斐波那契数列又被称为黄金分割数列，指的是这样的一个数列：1,1,2,3,5,8,13,21,34....，
// 它有如下递推的方法定义：F(1)=1,F(2)=1,F(n)=F(n-1)+F(n-2)(n&gt;=2,n是正整数)


export const fibonacci = (n: number) => {
    if (n < 0) throw new Error("输入的数字不能小于0");
    if (n == 1 || n == 2) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
};
// f9 = f8+f7,,f8 = f7+ f6,,重复计算f7,,浪费
// 保存每次的递归值

export const fibonacci2 = (n: number) => {
    if (n < 0) throw new Error("输入的数字不能小于0");
    let arr = [0, 1];
    function calc(n: number) {
        if (n < 2) {
            return arr[n]
        }
        if (arr[n] != undefined) {
            return arr[n]
        }
        let data = calc(n - 1) + calc(n - 2);
        arr[n] = data;
        return data;
    }
    return calc(n)
}

// 动态规划

export const fibonacci3 = (n: number) => {
    var a = [0, 1, 1];
    if (n < 0) throw new Error("输入的数字不能小于0");
    if (n >= 3) {
        for (var i = 3; i <= n; i++) {
            a[i] = a[i - 1] + a[i - 2];
        }
    }
    return a[n]
}


