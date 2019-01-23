import * as React from "react";
import { Form, DatePicker, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as moment from "moment";
import Clock from "../Clock";
import { Redirect } from "react-router";
import "./getInfo.less";

interface State {
  isLoggedIn: boolean;
  birth: string;
}
export interface UserFormProps extends FormComponentProps {
  age?: number;
  name?: string;
  testtest?: (params: string) => void;
}
class GetInfo extends React.Component<UserFormProps, State> {
  constructor(props: UserFormProps) {
    super(props);
    this.state = { isLoggedIn: false, birth: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 0 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    if (this.state.isLoggedIn) {
      console.log(this.state.birth);
      return (
        <Redirect
          to={{
            pathname: "/lifeClock",
            state: { birthday: this.state.birth }
          }}
        />
      );
    } else {
      return (
        <div className="setBirth">
          <Clock name="生之钟" />
          <div className="setBirth-title">
            你<br />出<br />生<br />于
          </div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="">
              {getFieldDecorator("date-picker", config)(<DatePicker />)}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 24, offset: 0 }
              }}
            >
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    const { testtest } = this.props;
    this.props.form.validateFields((err: any, fieldsValue: any) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        birth: fieldsValue["date-picker"].format("YYYY-MM-DD")
      };
      this.setState({ birth: values.birth, isLoggedIn: true });
      if (testtest) {
        testtest(values.birth);
      }
      const now = moment().weekYear();
      console.log(now);
      console.log("Received values of form: ", values);
    });
  }
}

export default Form.create({
  onFieldsChange(props: any, field: object): void {
    console.log(field);
  },
  mapPropsToFields(props) {
    return props.fields;
  }
})(GetInfo);
