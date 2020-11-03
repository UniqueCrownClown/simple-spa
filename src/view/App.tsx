import * as React from "react";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import Main from "./main/Main";
import Register from "./register/Register";
import Login from "./login/Login";
import Main2 from "./main/Main2";
import ArticleCom from "./cnode/ArticleCom";
import MainSec from "./cnode/MainSec";
import UserCom from "./cnode/UserCom";
import LifeClock from "./lifeClock/LifeClock";
import Moment from "./moment/Moment";
import WriteMoment from "./moment/WriteMoment";
import Music from "./music/Music";
import PhotoMain from "./photo/photoMain";
import ChatMain from "./chat/Chat";
class App extends React.Component {
  // exact={true}时，路由不显式显现，route默认具有非排他性
  public render() {
    return (
      <Router>
        <div className="App">
          <CacheSwitch>
            {/* 后续加上exact */}
            <Route
              path="/simple-spa"
              render={(props) => (
                <Main {...props}>
                  {/* exact参数，路由是否严格匹配 */}
                  <CacheSwitch>
                    <CacheRoute
                      path="/simple-spa/music"
                      // exact={true}
                      component={(props) => <Music {...props} />}
                    />
                    <CacheRoute
                      exact={true}
                      path="/simple-spa/lifeClock"
                      component={(props) => <LifeClock {...props} />}
                    />
                    <CacheRoute path="/simple-spa/photo" component={PhotoMain} />
                    {/* <Route path="/chat" component={ChatMain} />
                    <Route path="/moment" component={Moment} />
                    <Route path="/writemoment" component={WriteMoment} />
                    <Route path="/cnode" exact={true} component={MainSec} />
                    <Route
                      path="/topic/:id"
                      component={(props) => <ArticleCom {...props} />}
                    /> */}
                    <Route
                      path="/@:username/users"
                      component={(props) => <UserCom {...props} />}
                    />
                  </CacheSwitch>
                </Main>
              )}
            />
            <Route path="/register" exact={true} component={Register} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/main2" exact={true} component={Main2} />
          </CacheSwitch>
        </div>
      </Router>
    );
  }
}

export default App;
