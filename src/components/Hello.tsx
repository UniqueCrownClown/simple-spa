import { Button } from "antd";
import * as React from "react";
import { Redirect } from "react-router";
interface Props {
  name: string;
  history: any;
}
interface State {
  isLoggedIn: boolean;
}
class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleClick = this.handleClick.bind(this);
  }
  public render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/world",
            search: "?face=1222",
            state: { referrer: "122727" }
          }}
        />
      );
    } else {
      return (
        <div className="Hello">
          <p>我是hello组件eee</p>
          <Button type="primary" onClick={this.handleClick}>
            我是按钮
          </Button>
        </div>
      );
    }
  }
  public handleClick() {
    this.setState({
      isLoggedIn: true
    });
  }
}
export default Hello;
