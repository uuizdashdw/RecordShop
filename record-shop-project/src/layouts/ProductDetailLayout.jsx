import React from 'react';

const ProductDetailLayout = React.memo(function ProductDetailLayout({
	children,
}) {
	return <main>{children}</main>;
});

export default ProductDetailLayout;
