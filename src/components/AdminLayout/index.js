import React from "react";
import { Layout, Menu } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import confirmLogout from "./confirmLogout";
import AuthenticatedContext from "../AuthenticatedContext";

import "./styles.scss";

const { Header, Content, Footer, Sider } = Layout;

class AdminLayout extends React.Component {
  handleClick = (url) => {
    const { history } = this.props;
    history.push(url);
  };

  logout = (changeAuthenticatedStatus) => {
    const { history } = this.props;

    confirmLogout(async () => {
      try {
        sessionStorage.clear();
        changeAuthenticatedStatus(false);
        history.push("/login");
      } catch (error) {}
    });
  };

  render() {
    const { children, title } = this.props;

    return (
      <Layout className="admin-layout">
        <Sider breakpoint="lg" collapsedWidth="0">

          <AuthenticatedContext.Consumer>
            {({ changeAuthenticatedStatus }) => (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[title]}>
                <Menu.Item
                  onClick={() => this.handleClick("/")}
                  key="Home"
                  icon={<HomeOutlined />}
                >
                  My lists
                </Menu.Item>

                <Menu.Item
                  key="4"
                  icon={<LogoutOutlined />}
                  onClick={() => this.logout(changeAuthenticatedStatus)}
                >
                  Logout
                </Menu.Item>
              </Menu>
            )}
          </AuthenticatedContext.Consumer>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            <h1 style={{ marginLeft: 20 }}>{title}</h1>
          </Header>
          <Content className="admin-content" style={{ margin: "24px 16px 0" }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Gianfranco Manganiello ©2020
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

AdminLayout.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

export default withRouter(AdminLayout);
