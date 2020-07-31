import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./view/App";
import "./less/index.less";
import "./assets/css/font/iconfont.css";
import { Provider } from "react-redux";
import configureStore from "./stores/";

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
