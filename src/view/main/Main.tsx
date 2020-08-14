import { Avatar, Drawer, Icon, Menu } from "antd";
import * as React from "react";
import { Link, Route, Switch } from "react-router-dom";
import ArticleCom from "../cnode/ArticleCom";
import MainSec from "../cnode/MainSec";
import UserCom from "../cnode/UserCom";
import LifeClock from "../lifeClock/LifeClock";
import Moment from "../moment/Moment";
import WriteMoment from "../moment/WriteMoment";
import Music from "../music/Music";
import MusicBar from "../music/MusicBar";
import PhotoMain from "../photo/photoMain";
import ChatMain from "./../chat/Chat";
import "./main.less";

interface IItem {
  id: string;
  label: string;
  iconType?: string;
  link?: string;
  children?: IItem[];
}
interface TopMenuItem {
  id: string;
  label: string;
}
interface Props {
  location: any;
  match: any;
}
interface State {
  visible: boolean;
  current: string;
  leftMenu: IItem[];
  topMenu: TopMenuItem[];
  collapsed: boolean;
}

const { SubMenu } = Menu;
class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      current: "mail",
      leftMenu: [
        //   {
        //   id: '1', label: '留言', iconType: 'mail', children:
        //     [{ id: '1-1', label: '1-1', link: '/moment' },
        //     { id: '1-2', label: '1-2', link: '/writemoment' }]
        // },
        { id: "2", label: "聊天", link: "/chat" },
        { id: "3", label: "音乐", link: "/music" },
        { id: "4", label: "生辰", link: "/lifeClock" },
        { id: "5", label: "照片", link: "/photo" },
        { id: "6", label: "cnode", link: "/cnode" },
      ],
      topMenu: [],
      collapsed: true,
    };
  }
  public render() {
    const { topMenu, leftMenu } = this.state;
    return (
      <div className="treasure-main">
        <div className="treasure-header">
          <Icon
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggleCollapsed}
            style={{ fontSize: "24px", color: "#fff" }}
          />
          <div className="treasure-header-title">Moment</div>
          <Icon
            type="menu-fold"
            style={{ fontSize: "24px", color: "#fff" }}
            onClick={this.showDrawer}
          />
        </div>
        {topMenu.length > 0 ? (
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            {topMenu.map((item) => (
              <Menu.Item key={item.id}>{item.label}</Menu.Item>
            ))}
          </Menu>
        ) : null}
        <Drawer
          title="菜单列表"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={200}
        >
          <div className="drawer-content">
            <div>
              <Avatar size={64} icon="user" />
            </div>
            <div>设置</div>
            <div>关于</div>
            <div>退出</div>
          </div>
        </Drawer>
        <div className="main-container">
          <div
            className="left-side"
            style={this.state.collapsed ? { display: "none" } : null}
          >
            <Menu
              onClick={this.handleClick2}
              defaultSelectedKeys={["1"]}
              mode="inline"
              inlineCollapsed={this.state.collapsed}
            >
              {leftMenu.map((item) => {
                return this.renderMenu(item);
              })}
            </Menu>
          </div>
          <div className="right-side">
            {/* exact参数，路由是否严格匹配 */}
            <Switch>
              <Route exact path="/" component={Music} />
              <Route path="/music" component={Music} />
              <Route path="/chat" component={ChatMain} />
              <Route path="/lifeClock" component={LifeClock} />
              <Route path="/moment" component={Moment} />
              <Route path="/writemoment" component={WriteMoment} />
              <Route path="/cnode" exact={true} component={MainSec} />
              <Route path="/photo" component={PhotoMain} />
              <Route path="/topic/:id" component={ArticleCom} />
              <Route path="/@:username/users" component={UserCom} />
            </Switch>
          </div>
        </div>
        <div className="treasure-footer">
          <MusicBar />
        </div>
      </div>
    );
  }

  public showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  public toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  public handleTogetInfo = () => {
    this.setState({
      visible: false,
    });
  };

  public onClose = () => {
    this.setState({
      visible: false,
    });
  };

  public handleClick = (e: any): void => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  public handleClick2 = (e: any): void => {
    console.log("click ", e);
  };
  public componentDidMount() {
    // this.setState();
  }
  // 深度遍历renderMenu
  public renderMenu(data: IItem) {
    if (data.children) {
      return (
        <SubMenu
          key={data.id}
          title={
            <span>
              {data.iconType ? <Icon type={data.iconType} /> : null}
              <span style={{ width: 100, display: "inline-block" }}>
                {data.label}
              </span>
            </span>
          }
        >
          {data.children.map((item) => {
            return this.renderMenu(item);
          })}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={data.id}>
          {data.link ? (
            <Link to={data.link}>
              <Icon type="appstore" />
              <span style={{ width: 100, display: "inline-block" }}>
                {data.label}
              </span>
            </Link>
          ) : (
            {}
          )}
        </Menu.Item>
      );
    }
  }
}

export default Main;
