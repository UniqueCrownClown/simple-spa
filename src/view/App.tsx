import * as React from "react";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./main/Main";
import Register from "./register/Register";
import Login from "./login/Login";
import Main2 from "./main/Main2";
class App extends React.Component {
  // exact={true}时，路由不显式显现，route默认具有非排他性
  public render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* 后续加上exact */}
            <Route path="/" component={Main} />
            <Route path="/register" exact={true} component={Register} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/main2" exact={true} component={Main2} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
