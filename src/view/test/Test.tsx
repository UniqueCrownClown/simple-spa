import React, { useState, useEffect } from 'react';


const Test = () => {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    // useEffect(() => {
    //   document.title = `You clicked ${count} times`;
    // });
    // 每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。
    // 怎么跳过一些不必要的计算呢？我们只需要给useEffect传第二个参数
    // 只有当count的值发生变化时，才会重新执行`document.title`这一句
    useEffect(() => {
        // 异步, 等于componentDidMount + componentDidUpdate
        document.title = `You clicked ${count} times`;
        // 在组件下一次重新渲染之后执行
        return function cleanup() {
            console.log("测试useEffect生命周期")
        };
    }, [count]);
    const handleBtnClick = () => setCount(count + 1);
    return (
        <div>
            <p>You clicked {count} times</p>
            <div>音乐页面</div>
            <button onClick={handleBtnClick}>
                Click me
        </button>
        </div>
    );
}
export default Test;