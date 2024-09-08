import React from "react";

const AuthLayout = React.memo(function AuthLayout({ children }) {
  return <main>{children}</main>;
});

export default AuthLayout;
