import React, { useState } from "react";

const AuthenticatedContext = React.createContext();

export function AuthenticatedProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("session-token")
  );

  return (
    <AuthenticatedContext.Provider
      {...props}
      value={{
        isAuthenticated: isAuthenticated,
        changeAuthenticatedStatus: setIsAuthenticated,
      }}
    />
  );
}

export function useAuthenticatedContext() {
  const context = React.useContext(AuthenticatedContext);

  if (!context) {
    throw new Error(
      "'useAuthenticatedContext' must be inside the 'AuthenticatedProvider"
    );
  }

  return context;
}

export default AuthenticatedContext;
