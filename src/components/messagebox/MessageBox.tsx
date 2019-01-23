import * as React from "react";
import AdmireBox from "../../components/admirebox/AdmireBox";
import "./messagebox.less";
export interface MessageItem {
  id: string;
  owner: string;
  avatar: string;
  content: string;
  picList?: string[] | undefined;
  admireList?: string[] | undefined;
}
interface Props {
  message: MessageItem;
  admireList?: string[];
  [propName: string]: any;
}
interface State {
  isLoggedIn: boolean;
}
class MessageBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleClick = this.handleClick.bind(this);
    this.setcomment = this.setcomment.bind(this);
  }
  public render() {
    const { admireList } = this.props;
    const { owner, avatar, content, picList } = this.props.message;
    return (
      <div className="messageBox">
        <div className="messageBox-content">
          <div className="messageBox-content-left">
            <div className="avatar">
              <img src={avatar} />
            </div>
          </div>
          <div className="messageBox-content-right">
            <div className="name">{owner}</div>
            <div className="content">{content}</div>
            <ul className="picList">
              {picList !== undefined
                ? picList.map((data: string, index: number) => {
                  return (
                    <li key={index}>
                      <img src={data} alt="" />
                    </li>
                  );
                })
                : null}
            </ul>
          </div>

        </div>
        <div className="message-toolbar">
          <AdmireBox
            admireList={admireList}
            setadmire={this.setadmire}
            setcomment={this.setcomment}
          />
        </div>
      </div>
    );
  }
  public handleClick() {
    this.setState({
      isLoggedIn: true
    });
  }

  public setadmire() {
    const { id } = this.props.message;
    alert(id);
  }

  public setcomment() {
    const { id } = this.props.message;
    alert(id);
  }
}
export default MessageBox;
