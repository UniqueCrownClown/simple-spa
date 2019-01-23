import * as React from "react";
import { Icon } from "antd";
import "./AdmireBox.less";
interface Props {
  admireList?: string[] | undefined;
  setadmire: () => void;
  setcomment: () => void;
}
interface State {
  isfold: boolean;
}
class AdmireBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isfold: false };
    this.togglefold = this.togglefold.bind(this);
  }
  public render() {
    const { admireList, setadmire, setcomment } = this.props;
    return (
      <div className="admire">
        <div className="admire-bar">
          {this.state.isfold ? (
            <div className="admire-collection">
              <div onClick={setadmire}>
                <Icon type="heart" />
                <span>点赞</span>
              </div>
              <div onClick={setcomment}>
                <Icon type="edit" />
                <span>评论</span>
              </div>
            </div>
          ) : null}
          <div className="admire-togglefold">
            <Icon type="small-dash" onClick={this.togglefold} />
          </div>
        </div>
        <ul className="admire-list">
          {admireList !== undefined
            ? admireList.map((data, index) => {
                return <li key={index}>{data}</li>;
              })
            : null}
        </ul>
      </div>
    );
  }

  public togglefold() {
    const toggle = this.state.isfold;
    this.setState({
      isfold: !toggle
    });
  }
}
export default AdmireBox;
