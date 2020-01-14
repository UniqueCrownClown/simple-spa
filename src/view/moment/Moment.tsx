import * as React from "react";
// import { info } from "../../components/Info";
import { Redirect } from "react-router";
import "./Moment.less";
import MessageBox, {
  MessageItem
} from "../../components/messagebox/MessageBox";
import CommentBox from "../../components/commentbox/CommentBox";

interface Props {
  name: string;
  navigation: any;
  history:any;
}
interface States {
  momentData: MessageItem[];
  isToAdd: boolean;
}
class Moment extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      momentData: [
        {
          id: "1",
          owner: "张三",
          avatar: require('./../../assets/avatar.jpg'),
          content:
            "在 Redux 应用中，所有的 state 都被保存在一个单一对象中",
          picList: [],
          admireList: ["小红", "小黑"]
        },
        {
          id: "2",
          owner: "李四",
          avatar: require('./../../assets/avatar.jpg'),
          content: "湖人英格拉姆这个菜B",
          admireList: ["小白", "小青"]
        }
      ],
      isToAdd: false
    };
    this.toAdd = this.toAdd.bind(this);
    this.toReturn = this.toReturn.bind(this);
  }
  public render() {
    const { momentData, isToAdd } = this.state;
    if (!isToAdd) {
      return (
        <div className="moment">
          {momentData.map((data, index) => {
            return (
              <div key={index}>
                <MessageBox message={data} admireList={data.admireList} />
                <CommentBox id={data.id} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/main/writemoment"
          }}
        />
      );
    }
  }

  /**
   * toAdd
   */
  public toAdd() {
    // info();
    this.setState({ isToAdd: true });
  }

  /**
   * toReturn
   */
  public toReturn() {
    this.props.history.goBack();
  }
}
export default Moment;
