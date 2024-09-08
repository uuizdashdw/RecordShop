import React from "react";

const MyPageLayout = React.memo(function MyPageLayout({ children }) {
  return <main>{children}</main>;
});

export default MyPageLayout;
