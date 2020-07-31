// 用react-hook和antdmobile作重构
import { Carousel, WingBlank } from "antd-mobile";
import "./main2.less";
import * as React from "react";
declare type Props = any;
declare type State = any;
export default class Main2 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: ["1", "2", "3"],
      slideIndex: -1,
    };
  }
  public componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          "AiyWuByWklrrUDlFignR",
          "TekJlZRVCjLFexlOCuWn",
          "IJOtIlfsYdTyaDTRVrLI",
        ],
      });
    }, 100);
  }
  public render() {
    const xxxxx = `rgba(${255*Math.random()},${255*Math.random()},${255*Math.random()}, .8)`;
    return (
      <WingBlank>
        <Carousel
          className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay={true}
          infinite={true}
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={(index) => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (
            <a
              key={val}
              href="javascript:void(0)"
              style={{
                display: "block",
                position: "relative",
                top: this.state.slideIndex === index ? -10 : 0,
                boxShadow: "2px 1px 1px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{ width: "100%", verticalAlign: "top", height: "400px",backgroundColor: xxxxx}}
              />
              {/* <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                /> */}
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}
