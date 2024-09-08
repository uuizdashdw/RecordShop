import React from 'react';

const SearchLayout = React.memo(function SearchLayout({ children }) {
	return <main className='search_layout'>{children}</main>;
});

export default SearchLayout;
