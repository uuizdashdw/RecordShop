// CSS
import styles from './search.module.css';

// Hooks
import { useState, useEffect, useRef } from 'react';

// Router
import { useRouter } from 'next/router';

const Search = () => {
	const [searchData, setSearchData] = useState('');

	const inputRef = useRef(null);

	const router = useRouter();

	const onSearchProduct = e => {
		const { value } = e.target;
		setSearchData(value);
	};

	const onClickToSearch = async () => {
		if (searchData.trim() === '') {
			alert('검색어를 입력해주세요');
			return;
		}

		router.push(`/search?query=${encodeURIComponent(searchData)}`);
	};

	const onEnterToSearch = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			onClickToSearch(searchData);
		}
	};

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	return (
		<div className={styles.container}>
			<input
				className={styles.search_bar}
				type="text"
				ref={inputRef}
				value={searchData}
				onKeyDown={event => onEnterToSearch(event)}
				onChange={e => onSearchProduct(e)}
				placeholder="찾으시는 상품이 있으신가요?"
			/>
			<button className={styles.search_button} onClick={onClickToSearch}>
				검색
			</button>
		</div>
	);
};

export default Search;
