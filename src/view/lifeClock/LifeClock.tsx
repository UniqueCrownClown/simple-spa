// import * as actions from "../../stores/actions";
import { connect } from "react-redux";
// import { Dispatch } from "redux";
import { StoreState } from "../../stores/typing";

import * as React from "react";
import * as moment from "moment";
import "./LifeClock.less";
import Clock from "../../components/Clock";
import AgeTable from "../../components/agetable/AgeTable";
import GetInfo from "../../containers/GetInfo";
import DeadTable, { DeadTableProps } from "../../components/agetable/DeadTable";
import { Button, Select, Modal } from 'antd';
interface Props {
  location: any;
  birth: string;
  history: any;
}
interface State {
  visible: boolean;
  modalVisible: boolean;
  selectModal: boolean;
  deadCount: string;
  deadTime: DeadTableProps["deadTime"];
  thingsCount: DeadTableProps["thingsCount"];
}
class LifeClock extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false,
      selectModal: false,
      deadCount: "0",
      deadTime: {
        hour: 0,
        min: 0
      },
      thingsCount: {
        rice: 0,
        love: 0,
        week: 0,
        holiday: 0
      }
    };
    this.selectModalOk = this.selectModalOk.bind(this);
    this.selectModalCancel = this.selectModalCancel.bind(this);
  }

  public render() {
    const { birth } = this.props;
    const { Option } = Select;
    return (
      <div className="shengchen">
        <div className="shengchen_content">
          <div>
            <Clock name="生之钟" type="white" />
            {birth === "1970-01-01" ? null : <AgeTable birth={birth} />}
            {<Button onClick={this.toGetBirth}>选择日期</Button>}
          </div>
          <div>
            <Clock name="死之钟" type="black" time={this.state.deadTime} />
            <DeadTable deadTime={this.state.deadTime} thingsCount={this.state.thingsCount} />
            <Button type="primary" onClick={this.showModal}>openModal</Button>
            <Modal title="Basic Modal"
              visible={this.state.modalVisible}
              onOk={this.modalOk}
              onCancel={this.modalCancel}>
              <div>
                <span>你猜测活多少岁??</span>
                <Select defaultValue="50" style={{ width: 120 }} onChange={(value) => {
                  this.setState({
                    deadCount: value
                  })
                }}>
                  {new Array(100).fill(undefined).map((item, index) =>
                    (<Option value={index + 30} key={(index + 30).toString()}>{index + 30}</Option>))}
                </Select>
              </div>
            </Modal>
            <Modal title="选择日期"
              visible={this.state.selectModal}
              onOk={this.selectModalOk}
              onCancel={this.selectModalCancel}>
              <GetInfo />
            </Modal>
          </div>
        </div>
      </div>
    );
  }

  public toGetBirth = () => {
    // this.props.history.push({
    //   pathname: '/detail',
    //   state: {
    //     id: 3
    //   }
    // });
    // this.props.history.replace({
    //   pathname: '/getInfo',
    //   state: {
    //     id: 'fromLifeClock'
    //   }
    // });
    this.setState({
      selectModal: true
    })
  }

  public showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  public modalOk = () => {
    // 触发渲染死之钟
    this.setState({
      modalVisible: false
    })
    // 判断出生日期是否已经设置
    const birth = this.props.birth;
    const splitB = birth.split("-");
    if (parseInt(splitB[0], 10) === 1970) {
      return
    }
    const xYear = (parseInt(splitB[0], 10) + parseInt(this.state.deadCount, 10)).toString();
    const dead = xYear + "-" + splitB[1] + "-" + splitB[2];
    const birthM = moment(birth);
    const deadM = moment(dead);
    const currentM = moment();
    const haha1 = currentM.diff(birthM, "seconds");
    const haha2 = deadM.diff(birthM, "seconds");
    const haha3 = deadM.diff(currentM, "days");
    const haha4 = deadM.diff(currentM, "weeks");
    const haha5 = deadM.diff(currentM, "years");
    const totalMins = Math.floor(haha1 / haha2 * 24 * 60);
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    this.setState({
      deadTime: {
        hour: h,
        min: m
      },
      thingsCount: {
        rice: haha3 * 3,
        love: haha4 * 2,
        week: haha4,
        holiday: haha5 * 2
      }
    })
  }

  public modalCancel = () => {
    // 触发渲染死之钟
    this.setState({
      modalVisible: false
    })
  }

  public selectModalOk() {
    this.setState({
      selectModal: false
    })
  }

  public selectModalCancel() {
    this.setState({
      selectModal: false
    })
  }

  // public handleChange(value) {
  //   console.log(`selected ${value}`);
  // }

  public showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  public handleTogetInfo = () => {
    alert("togetInfo");
    this.setState({
      visible: false
    });
  };

  public onClose = () => {
    this.setState({
      visible: false
    });
  };
}

// export default LifeClock;

export function mapStateToProps({ userBithday }: StoreState) {
  return {
    birth: userBithday
  };
}
export default connect(mapStateToProps)(LifeClock);
