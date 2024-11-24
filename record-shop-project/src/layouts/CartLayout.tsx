import React from 'react';
import { LayoutProps } from '../types';

const CartLayout = React.memo(function CartLayout({ children }: LayoutProps) {
	return <main>{children}</main>;
});

export default CartLayout;
