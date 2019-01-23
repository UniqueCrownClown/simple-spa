import { Button } from "antd";
import * as React from "react";
interface Props {
  name: string;
  match?: any;
  location?: any;
}
interface State {
  referrer: string;
}
class World extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { referrer: "123" };
  }
  public render() {
    return (
      <div>
        <Button onClick={this.handleClick}>我是world</Button>
      </div>
    );
  }

  public handleClick() {
    // a=1 ：这种属于 search 字符串在 location.search 里取值
    // a/123 ：这种需要从 match.params里取值
    console.log("wrold" + this.props.location.state.referrer);
    alert(this.props.location.search);
  }
}
export default World;
