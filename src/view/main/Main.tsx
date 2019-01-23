import * as React from "react";
// BrowserRouter as Router(也可以用)
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Drawer, Icon, Menu, Avatar } from "antd";
import LifeClock from "../lifeClock/LifeClock";
import Music from "../music/Music";
import Moment from "../moment/Moment";
import WriteMoment from "../moment/WriteMoment";
import ChatMain from "./../chat/Chat";
import Test from "./../test/Test";
import "./main.less";

interface IItem {
  id: string;
  label: string;
  iconType?: string;
  link?: string;
  children?: IItem[]
}
interface TopMenuItem {
  id: string;
  label: string;

}
interface Props {
  location: any;
}
interface State {
  visible: boolean;
  current: string;
  leftMenu: IItem[],
  topMenu: TopMenuItem[]
}

const { SubMenu } = Menu;
class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false, current: 'mail', leftMenu:
        [{
          id: '1', label: '留言', iconType: 'mail', children:
            [{ id: '1-1', label: '1-1', link: '/main/moment' },
            { id: '1-2', label: '1-2', link: '/main/writemoment' }]
        },
        { id: '2', label: '聊天', link: '/main/chat' },
        { id: '3', label: '音乐', link: '/music' },
        { id: '4', label: '生辰', link: '/lifeClock' },
        { id: '5', label: '测试', link: '/test' },
        ],
      topMenu: []
    };
  }
  public render() {
    const { topMenu, leftMenu } = this.state;
    return (
      <Router>
        <div className="treasure-main">
          <div className="treasure-header">
            <div className="treasure-header-title">Moment</div>
            <Icon type="menu-fold"
              style={{ fontSize: '24px', color: '#fff' }}
              onClick={this.showDrawer} />
          </div>
          {topMenu.length > 0 ? (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              {topMenu.map(item => (<Menu.Item key={item.id}>
                {item.label}
              </Menu.Item>))}
            </Menu>
          ) : null}
          <Drawer
            title="菜单列表"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div>
              <Avatar size={64} icon="user" />
            </div>
            <p>设置</p>
            <p>退出</p>
          </Drawer>
          <div className="main-container">
            <div className="left-side">
              <Menu
                onClick={this.handleClick2}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                mode="inline"
              >
                {leftMenu.map(item => {
                  return this.renderMenu(item)
                })}
              </Menu>
            </div>
            <div className="right-side">
              <Switch>
                <Route path="/main/chat" component={ChatMain} />
                <Route path="/lifeClock" exact={true} component={LifeClock} />
                <Route path="/main/moment" component={Moment} />
                <Route path="/main/writemoment" component={WriteMoment} />
                <Route path="/music" component={Music} />
                <Route path="/test" component={Test} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  public showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  public handleTogetInfo = () => {
    this.setState({
      visible: false
    });
  };

  public onClose = () => {
    this.setState({
      visible: false
    });
  };

  public handleClick = (e: any): void => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  public handleClick2 = (e: any): void => {
    console.log('click ', e);
  }
  public componentDidMount() {
    // this.setState();
  }
  // 深度遍历renderMenu
  public renderMenu(data: IItem) {
    if (data.children) {
      return (<SubMenu key={data.id} title={
        <span>
          {data.iconType ? <Icon type={data.iconType} /> : null}
          <span>{data.label}</span>
        </span>
      }>{data.children.map(item => {
        return this.renderMenu(item)
      })}</SubMenu>);
    } else {
      return (<Menu.Item key={data.id}>
        {data.link ? <Link to={data.link}><Icon type="appstore" />{data.label}</Link> : {}}
      </Menu.Item>)
    }
  }
}

export default Main;
