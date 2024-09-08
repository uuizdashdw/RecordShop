import React from "react";

const ProductLayout = React.memo(function ProductLayout({ children }) {
  return <main>{children}</main>;
});

export default ProductLayout;
