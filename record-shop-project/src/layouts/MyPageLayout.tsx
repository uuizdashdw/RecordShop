import React from 'react';
import { LayoutProps } from '../types';

const MyPageLayout = React.memo(function MyPageLayout({
	children,
}: LayoutProps) {
	return <main>{children}</main>;
});

export default MyPageLayout;
