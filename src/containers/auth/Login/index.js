import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import AuthLayout from "../../../components/AuthLayout";
import api from "../../../shared/api-rest";
import AuthenticatedContext from "../../../components/AuthenticatedContext";

import "./styles.scss";

class LoginPage extends React.Component {
  state = { loading: false };

  onFinish = (values, changeAuthenticatedStatus) => {
    const { history } = this.props;

    this.setState({ loading: true }, async () => {
      try {
        const token = await api.login(values.username, values.password);
        sessionStorage.setItem("session-token", token);
        changeAuthenticatedStatus(true);

        this.setState({ loading: false });

        history.push("/");
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  };

  loginPassword = (changeAuthenticatedStatus) => (
    <Form onFinish={(e) => this.onFinish(e, changeAuthenticatedStatus)}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Link to="register" id="form-register" className="login-form-forgot">
        Register
      </Link>

      <Link to="forgot-password" id="form-forgot" className="login-form-forgot">
        Forgot password
      </Link>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );

  render() {
    const { loading } = this.state;
    return (
      <AuthLayout>
        <Spin spinning={loading} delay={500}>
          <AuthenticatedContext.Consumer>
            {({ changeAuthenticatedStatus }) =>
              this.loginPassword(changeAuthenticatedStatus)
            }
          </AuthenticatedContext.Consumer>
        </Spin>
      </AuthLayout>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
