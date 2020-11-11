import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GenerateRoutes from "./components/GenerateRoutes";
import routesAdmin from "./containers/admin";
import routesAuth from "./containers/auth";
import {AuthenticatedProvider} from "./components/AuthenticatedContext";

class App extends Component {
  render() {
    return (
      <AuthenticatedProvider>
        <Router>
          <GenerateRoutes routes={[...routesAuth, ...routesAdmin]} />
        </Router>
      </AuthenticatedProvider>
    );
  }
}

export default App;
