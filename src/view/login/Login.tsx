import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import * as md5 from "md5";
import { login } from "../../api";
import "./Login.less";
interface States {
  isLoggedIn: boolean;
  user?: any;
}
class Login extends React.Component<FormComponentProps, States> {
  constructor(props: FormComponentProps) {
    super(props);
    this.state = { isLoggedIn: false };
  }
  public componentDidMount() {
    console.info("hahaha");
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/main"
          }}
        />
      );
    } else {
      return (
        <div className="login">
          <h3>登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a href="javascript:void(0)">
                <Link to="/register">register now!</Link>
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: boolean, values: any) => {
      if (!err) {
        const { userName, password } = values;
        const params = new URLSearchParams();
        params.append("username", userName);
        params.append("password", md5(password));
        try {
          const responseValue = await login(params);
          const { status, data } = responseValue;
          console.info(responseValue);
          if (status !== 200) {
            throw data.msg || "登录异常";
          } else {
            if (data.code === 200) {
              this.setState({
                isLoggedIn: true
              });
            }
          }
        } catch (error) {
          this.setState({
            isLoggedIn: true
          });
        }
      }
    });
  };
}
export default Form.create()(Login);
