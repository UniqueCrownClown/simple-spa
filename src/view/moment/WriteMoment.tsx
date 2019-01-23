import * as React from "react";
import { Input, Upload, Button, Icon } from "antd";
import { UploadProps } from "antd/lib/upload";
import './WriteMoment.less';

const { TextArea } = Input;
interface Props {
  name: string;
  history: any;
}
interface States {
  textValue: string;
}
const fileList = [
  {
    uid: "-1",
    name: "xxx.png",
    url:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    size: 123333,
    type: "picture"
  }
];

const props1: UploadProps = {
  action: "//jsonplaceholder.typicode.com/posts/",
  listType: "picture",
  defaultFileList: [...fileList]
};

class WriteMoment extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { textValue: "" };
    this.handlechange = this.handlechange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  public render() {
    return (
      <div className="writeMoment">
        <div className="writeMoment-header">
          <Icon type="left" className="to-left-btn" onClick={() => {
            this.props.history.goBack();
          }} />
          <div>发表信息</div>
        </div>
        <div>
          <Upload {...props1}>
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
          <br />
        </div>
        <TextArea
          placeholder="这一刻的想法..."
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={this.handlechange}
        />
        <Button
          type="primary"
          className="certain-button"
          onClick={this.handleClick}
        >
          确定
        </Button>
        <Button type="primary"
          className="certain-button"
          onClick={this.handleCancel}>取消</Button>
      </div>
    );
  }
  private handleClick() {
    alert(this.state.textValue);
  }
  private handlechange(val: any) {
    // console.log(key,val.target.value)
    this.setState({
      textValue: val.target.value
    });
    // console.log(this.state)
  }
  private handleCancel() {
    // historyBack()
    this.props.history.goback();
  }
}
export default WriteMoment;
