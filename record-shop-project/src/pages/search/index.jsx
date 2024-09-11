// CSS
import styles from './index.module.css';

// Hooks
import { useState, useEffect } from 'react';

// Components
import SearchLayout from '@/layouts/ProductLayout';

// Dynamic Import
import dynamic from 'next/dynamic';
// ProductItem
const DynamicProductItem = dynamic(
	() => import('@/components/product/ProductItem'),
);

// Router
import { useRouter } from 'next/router';

// API
import { fetchProductsByName } from '../api';
import Search from '@/components/search/Search';

const SearchPage = () => {
	const router = useRouter();
	const { query } = router.query;

	const [products, setProducts] = useState([]);

	const fetchSearchResult = async () => {
		const results = await fetchProductsByName(query);
		setProducts(results);
	};

	useEffect(() => {
		if (query) {
			fetchSearchResult();
		}
	}, [query]);

	return (
		<SearchLayout>
			<Search placeholder={'찾으시는 상품이 있으신가요?'} />
			{products.length ? (
				<div>
					<h3 className={styles.title}>검색 결과</h3>
					<ul className={styles.product_list}>
						{products.map((product, index) => (
							<li key={index}>
								<DynamicProductItem product={product} />
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className={styles.no_result}>
					{query.query} 와(과) 관련된 상품이 없습니다.
				</div>
			)}
		</SearchLayout>
	);
};

SearchPage.getLayout = function getLayout(page) {
	return <SearchPage>{page}</SearchPage>;
};

export default SearchPage;
