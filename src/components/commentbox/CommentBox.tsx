import * as React from "react";
export interface CommentItem {
  id: string;
  source: string;
  target: string;
  time: string;
  isAnswer: boolean;
  message: string;
}
interface Props {
  id: string;
  [propname: string]: any;
}
interface State {
  isLoggedIn: boolean;
  commentList?: CommentItem[];
}
class CommentBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleClick = this.handleClick.bind(this);
  }
  public render() {
    const { commentList } = this.state;
    return (
      <div className="commentBox">
        <p>我是评论列表</p>
        <ul className="commentBox-list">
          {commentList
            ? commentList.map(item => {
                return (
                  <li key={item.id}>
                    <span>{item.source}</span>
                    {item.isAnswer ? (
                      <div className="huifu-block">
                        回复<span>{item.target}</span>
                      </div>
                    ) : null}
                    <span>:</span>
                    <span>
                      {item.message}({item.time})
                    </span>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
  public handleClick() {
    this.setState({
      isLoggedIn: true
    });
  }
}
export default CommentBox;
