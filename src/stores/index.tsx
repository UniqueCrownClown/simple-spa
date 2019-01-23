import { createStore } from "redux";
import { enthusiasm } from "./reducers";
import initState from "./states";
export default function() {
  let store;
  // 支持redux状态调试
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (store = createStore(
        enthusiasm,
        initState,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      ))
    : (store = createStore(enthusiasm, initState));
  return store;
}
