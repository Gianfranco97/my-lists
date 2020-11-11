import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

class AuthLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="auth-page-container">
        <div className="auth-form">
          {children}
        </div>
      </div>
    );
  }
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.array
  ]),
};

export default AuthLayout;
