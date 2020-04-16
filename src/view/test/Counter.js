import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' });
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);

    return (<div>
        <h1>{count}</h1>
        <input value={step} onChange={e => {
            dispatch({
                type: 'step',
                step: Number(e.target.value)
            });
        }} />
    </div>);
}

const initialState = {
    count: 0,
    step: 1,
};

function reducer(state, action) {
    const { count, step } = state;
    if (action.type === 'tick') {
        return { count: count + step, step };
    } else if (action.type === 'step') {
        return { count, step: action.step };
    } else {
        throw new Error();
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
