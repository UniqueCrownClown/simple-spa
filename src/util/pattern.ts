// const strategies = {
//     checkName: (name: string) => name.length > 0
// }
// 策略模式的验证例子
export const validator = (strategies: any) => {
    this.cache = [];

    // 添加策略事件
    this.add = (value, method) => {
        this.cache.push(() => {
            return strategies[method](value);
        });
    };

    // 检查
    this.check = function () {
        for (const xxx of this.cache) {
            if (xxx()) {
                // 开始检查
                return false
            }
        }
        return true;
    };
};