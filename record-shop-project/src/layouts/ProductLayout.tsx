import React from 'react';
import { LayoutProps } from '../types';

const ProductLayout = React.memo(function ProductLayout({
	children,
}: LayoutProps) {
	return <main>{children}</main>;
});

export default ProductLayout;
