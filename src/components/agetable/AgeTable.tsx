import * as React from "react";
import * as moment from "moment";
import "./agetable.less";
const YEAR = "YEAR";
const MONTH = "MONTH";
const DAY = "DAY";
const WEEK = "WEEK";
const HOUR = "HOUR";
const MIN = "MIN";
interface Props {
  birth: string;
}
interface States {
  date: Date;
}
class AgeTable extends React.Component<Props, States> {
  private timerID: any;
  constructor(props: Props) {
    super(props);
    this.state = { date: new Date() };
  }

  public render() {
    const intBirth = parseInt(this.getTrueValue(this.props.birth, "SEC"), 10);
    const agedetail = intBirth / 31536000;

    return (
      <div className="ageTable">
        <h3>你已经{agedetail.toFixed(8)}岁了</h3>
        <p>在这个世界上，你已经存在</p>
        <table className="ageTable-content">
          <tbody>
            <tr>
              <td>
                <span>{this.getTrueValue(this.props.birth, YEAR)}</span>
                <span>年</span>
              </td>
              <td>
                <span>{this.getTrueValue(this.props.birth, MONTH)}</span>
                <span>月</span>
              </td>
              <td>
                <span>{this.getTrueValue(this.props.birth, WEEK)}</span>
                <span>周</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{this.getTrueValue(this.props.birth, DAY)}</span>
                <span>天</span>
              </td>
              <td>
                <span>{this.getTrueValue(this.props.birth, HOUR)}</span>
                <span>小时</span>
              </td>
              <td>
                <span> {this.getTrueValue(this.props.birth, MIN)}</span>
                <span>分钟</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // 要暴露给react调用不能是私有
  public componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timerID);
  }

  private tick() {
    this.setState({
      date: new Date()
    });
  }

  private getTrueValue(birth: string, type: string): string {
    const birthM = moment(birth);
    const currentM = moment();
    let trueValue = "";
    switch (type) {
      case "YEAR":
        trueValue = currentM.diff(birthM, "years").toString();
        break;
      case "MONTH":
        trueValue = currentM.diff(birthM, "months").toString();
        break;
      case "DAY":
        trueValue = currentM.diff(birthM, "days").toString();
        break;
      case "WEEK":
        trueValue = currentM.diff(birthM, "weeks").toString();
        break;
      case "HOUR":
        trueValue = currentM.diff(birthM, "hours").toString();
        break;
      case "MIN":
        trueValue = currentM.diff(birthM, "minutes").toString();
        break;
      case "SEC":
        trueValue = currentM.diff(birthM, "seconds").toString();
        break;
      default:
        break;
    }
    return trueValue;
  }
}

export default AgeTable;
