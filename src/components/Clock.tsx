import * as React from "react";
import { DeadTableProps } from "./agetable/DeadTable";
interface State {
  date: Date;
}

interface Props {
  name: string;
  type?: string;
  time?: DeadTableProps["deadTime"];
}

class Clock extends React.Component<Props, State> {
  private hourTransform: any;
  private minuteTransform: any;
  private secondTransform: any;

  constructor(props: any) {
    super(props);
    this.state = { date: new Date() };
  }
  public componentDidMount() {
    // render执行完后执行
    const type = this.props.type || "white";
    const time = this.props.time;
    const hourHand: any = document.getElementById(type + "-hour");
    const minuteHand: any = document.getElementById(type + "-minute");
    const secondHand: any = document.getElementById(type + "-second");

    this.hourTransform = hourHand.transform.baseVal.getItem(0);
    this.minuteTransform = minuteHand.transform.baseVal.getItem(0);
    this.secondTransform = secondHand.transform.baseVal.getItem(0);
    if (type === "black" && time) {
      const date = new Date();
      date.setHours(time.hour);
      date.setMinutes(time.min);
      date.setSeconds(0);
      date.setMilliseconds(0);
      this.updateClock(date, true);
    } else {
      this.updateClock(new Date(), false);
    }

  }

  public updateClock(date: Date = new Date(), isStatic: boolean = false) {
    const secPer12Hours = 60 * 60 * 12;
    const secPerHour = 60 * 60;
    const secPerMinute = 60;

    const sec: number =
      date.getMilliseconds() / 1000 +
      date.getSeconds() +
      date.getMinutes() * 60 +
      date.getHours() * 60 * 60;
    const hourAngle = ((sec % secPer12Hours) * 360) / secPer12Hours;
    const minuteAngle = ((sec % secPerHour) * 360) / secPerHour;
    const secondAngle = ((sec % secPerMinute) * 360) / secPerMinute;
    this.hourTransform.setRotate(hourAngle, 125, 125);
    this.minuteTransform.setRotate(minuteAngle, 125, 125);
    this.secondTransform.setRotate(secondAngle, 125, 125);
    if (!isStatic) {
      window.requestAnimationFrame(this.updateClock.bind(this, new Date(), false));
    }
  }
  public render() {
    this.state = { date: new Date() };
    const type = this.props.type || "white";
    return (
      <svg width="250" height="250">
        <circle
          id="face"
          cx="125"
          cy="125"
          r="100"
          style={{
            fill: type === "white" ? "#f1f1f1" : "#333",
            stroke: type === "white" ? "#333" : "#f1f1f1",
            strokeWidth: "8"
          }}
        />
        <g id="hands">
          <path
            id={type + "-hour"}
            d="M 125 125 V 75"
            style={{ fill: "none", stroke: type === "white" ? "black" : "white", strokeWidth: "6" }}
            transform="rotate(0)"
          />

          <path
            id={type + "-minute"}
            d="M 125 125 V 50"
            style={{ fill: "none", stroke: type === "white" ? "black" : "white", strokeWidth: "4" }}
            transform="rotate(0)"
          />

          <path
            id={type + "-second"}
            d="M 125 125 V 30"
            style={{ fill: "none", stroke: "#f00", strokeWidth: "2" }}
            transform="rotate(0)"
          />
        </g>
        <g id="knob" transform="translate(125, 125)">
          <circle cx="0" cy="0" r="6" style={{ fill: type === "white" ? "black" : "white" }} />
        </g>
      </svg>
    );
  }
}

export default Clock;
