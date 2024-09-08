import React from 'react';

const MainLayout = React.memo(function MainLayout({ children }) {
	return <main>{children}</main>;
});

export default MainLayout;
