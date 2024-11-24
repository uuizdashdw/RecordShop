import React from 'react';
import { LayoutProps } from '../types';

const SearchLayout = React.memo(function SearchLayout({
	children,
}: LayoutProps) {
	return <main>{children}</main>;
});

export default SearchLayout;
