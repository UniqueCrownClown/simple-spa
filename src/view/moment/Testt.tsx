import * as React from "react";
interface Props {
  name: string;
}
class Testt extends React.Component<Props> {
  public render() {
    return (
      <ol>
        {React.Children.map(this.props.children, child => {
          return <li>{child}</li>;
        })}
      </ol>
    );
  }
}
export default Testt;
