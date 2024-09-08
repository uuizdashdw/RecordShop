import React from 'react';

const SearchLayout = React.memo(function SearchLayout({ children }) {
	return <main>{children}</main>;
});

export default SearchLayout;
