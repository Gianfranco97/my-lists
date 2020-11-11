import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import AuthLayout from "../../../components/AuthLayout";
import api from "../../../shared/api-rest";
import AuthenticatedContext from "../../../components/AuthenticatedContext";

import "./styles.scss";

class RegisterPage extends React.Component {
  state = { loading: false, showSuccessfullMessage: false };

  onFinish = (values, changeAuthenticatedStatus) => {
    const { history } = this.props;

    this.setState({ loading: true }, async () => {
      try {
        await api.register(values.username, values.password);

        this.setState({ loading: false, showSuccessfullMessage: true });

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

      <Link to="login" className="register-form-forgot">
        Log in
      </Link>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button">
          Register
        </Button>
      </Form.Item>
    </Form>
  );

  successfullMessage = () => (
    <>
      <h2>User successfully registered</h2>

      <p>
        Congratulations, you are one step away from organizing your life.
        Now you just need to login with your new user and start creating your tasks
      </p>

      <Link to="/">
        <Button type="primary" className="register-form-button">
          Go to Login
        </Button>
      </Link>
    </>
  );

  render() {
    const { loading, showSuccessfullMessage } = this.state;
    return (
      <AuthLayout>
        <Spin spinning={loading} delay={500}>
          <AuthenticatedContext.Consumer>
            {
              ({ changeAuthenticatedStatus }) =>
                showSuccessfullMessage ? this.successfullMessage() : this.loginPassword(changeAuthenticatedStatus)
            }
          </AuthenticatedContext.Consumer>
        </Spin>
      </AuthLayout>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(RegisterPage);
