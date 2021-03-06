import * as React from "react";
import { Avatar } from "antd";
import { Button } from "antd-mobile";
import "./Chat.less";
interface Props {
  location: string;
}
interface States {
  location: string;
}
export default class ChatMain extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className="chat_main">
        <div className="chat_main_container">
          <div className="chat_main_container_left">
            <div className="chat_main_content_avatar">
              <Avatar
                size={64}
                src={require("../../assets/images/avatar.jpg")}
              />
            </div>
          </div>
          <div className="chat_main_container_middle">
            <div className="chat_main_content_list">
              <Button>Start</Button>
            </div>
          </div>
          <div className="chat_main_container_right">
            <div className="chat_main_content_top">
              <div className="chat_main_content_list">会话列表</div>
            </div>
            <div className="chat_main_content_footer">输入框区域</div>
          </div>
        </div>
      </div>
    );
  }
}
