import React, { ReactNode } from 'react';
import { LayoutProps } from '../types';

const MainLayout = React.memo(function MainLayout({ children }: LayoutProps) {
	return <main>{children}</main>;
});

export default MainLayout;
