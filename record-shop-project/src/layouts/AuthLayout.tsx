import React from 'react';
import { LayoutProps } from '../types';

const AuthLayout = React.memo(function AuthLayout({ children }: LayoutProps) {
	return <main>{children}</main>;
});

export default AuthLayout;
