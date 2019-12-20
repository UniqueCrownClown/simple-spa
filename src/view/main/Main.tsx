import * as React from "react";
// BrowserRouter as Router(也可以用)
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Drawer, Icon, Menu, Avatar, Button } from "antd";
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
  match: any;
}
interface State {
  visible: boolean;
  current: string;
  leftMenu: IItem[],
  topMenu: TopMenuItem[],
  collapsed: boolean
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
        { id: '3', label: '音乐', link: '/' },
        { id: '4', label: '生辰', link: '//lifeClock' },
        { id: '2', label: '聊天', link: '//chat' },
        { id: '5', label: '测试', link: '//hello' },
        ],
      topMenu: [],
      collapsed: true
    };
  }
  public render() {
    const { topMenu, leftMenu } = this.state;
    const {match} = this.props;
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
            width={200}
          >
            <div className="drawer-content">
              <div>
                <Avatar size={64} icon="user" />
              </div>
              <div>设置</div>
              <div>退出</div>
            </div>
          </Drawer>
          <div className="main-container">
            <div className="left-side">
              <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button>
              <Menu
                onClick={this.handleClick2}
                defaultSelectedKeys={['1']}
                mode="inline"
                inlineCollapsed={this.state.collapsed}
              >
                {leftMenu.map(item => {
                  return this.renderMenu(item)
                })}
              </Menu>
            </div>
            {/* exact参数，路由是否严格匹配 */}
            <div className="right-side">
              <Switch>
                <Route path={`${match.path}/chat`} component={ChatMain} />
                <Route path={`${match.path}/lifeClock`} component={LifeClock} />
                <Route path="/main/moment" exact={true} component={Moment} />
                <Route path="/main/writemoment" exact={true} component={WriteMoment} />
                <Route path={match.path} component={Music} />
                <Route path={`${match.path}/hello`} component={Test} />
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

  public toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

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
          <span style={{ width: 100, display: "inline-block" }}>{data.label}</span>
        </span>
      }>{data.children.map(item => {
        return this.renderMenu(item)
      })}</SubMenu>);
    } else {
      return (<Menu.Item key={data.id}>
        {data.link ? <Link to={data.link}><Icon type="appstore" /><span style={{ width: 100, display: "inline-block" }}>{data.label}</span></Link> : {}}
      </Menu.Item>)
    }
  }
}

export default Main;
