import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./main/Main";
import Test from "../containers/Test";
import Register from "./register/Register";
import Login from "./login/Login";
class App extends React.Component {
  // exact={true}时，路由不显式显现，route默认具有非排他性
  public render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact={true} component={Main} />
            <Route path="/register" component={Register} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/test" component={Test} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
