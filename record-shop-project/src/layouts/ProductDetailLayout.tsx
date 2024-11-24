import React from 'react';
import { LayoutProps } from '../types';

const ProductDetailLayout = React.memo(function ProductDetailLayout({
	children,
}: LayoutProps) {
	return <main>{children}</main>;
});

export default ProductDetailLayout;
