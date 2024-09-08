import React from "react";

const CartLayout = React.memo(function CartLayout({ children }) {
  return <main>{children}</main>;
});

export default CartLayout;
