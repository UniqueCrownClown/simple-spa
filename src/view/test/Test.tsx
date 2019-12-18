import React, { useState, useEffect, useReducer } from 'react';


const Test = () => {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    // userEffect 这个钩子函数就是在每次组件渲染时，都会调用一次，而且会先调用钩子函数的返回值反注册之前的逻辑，再执行当前的函数体。
    // 如果是想componentDidMout的效果，第二个参数设置[]，如果未设置第二个参数，而且在内部改变了状态，就会一直重复渲染
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

    // tip1
    // Capture Value,每次 Render 都有自己的 Props 与 State



    // tip2
    // 在一个只想执行一次的 Effect 里依赖了外部变量1个
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1);
        }, 5000);
        return () => clearInterval(id);
    }, []);
    // setCount 还有一种函数回调模式，你不需要关心当前值是什么，只要对 “旧的值” 进行修改即可。
    // 这样虽然代码永远运行在第一次 Render 中，但总是可以访问到最新的 state
    // 在一个只想执行一次的 Effect 里依赖了外部变量2个
    // 利用 useEffect 的兄弟 useReducer 函数，将更新与动作解耦就可以了

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);
    // tip3


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
const reducer = (statex, action) => {
    const { count, step } = statex;
    switch (action.type) {
        case "tick": return { count: count + step, step };
        case "step": return { count, step: action.step };
    }
    return statex
};
const initialState = {
    count: 0,
    step: 1,
};
export default Test;