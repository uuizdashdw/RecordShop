// CSS
import styles from './index.module.css';

// Hooks
import { useState, useEffect, ReactNode } from 'react';

// Components
import SearchLayout from '../../layouts/ProductLayout';

// Dynamic Import
import dynamic from 'next/dynamic';
// ProductItem
const DynamicProductItem = dynamic(
	() => import('../..//components/product/ProductItem'),
);

// Router
import { useRouter } from 'next/router';

// API
import { fetchProductsByName } from '../api';
import Search from '../..//components/search/Search';
import { ProductType } from '../../types';

const SearchPage = () => {
	const router = useRouter();
	const { query } = router.query;

	const [products, setProducts] = useState<ProductType[]>([]);

	const fetchSearchResult = async () => {
		if (query) {
			console.log('쿼리 구조 ::: ', query);
			try {
				const results = await fetchProductsByName(query);
				setProducts(results);
			} catch (reason) {
				console.error(reason);
			}
		}
	};

	useEffect(() => {
		if (router.isReady) {
			fetchSearchResult();
		}
	}, [query, router.isReady]);

	return (
		<>
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
					{query} 와(과) 관련된 상품이 없습니다.
				</div>
			)}
		</>
	);
};

SearchPage.getLayout = function getLayout(page: ReactNode) {
	return <SearchLayout>{page}</SearchLayout>;
};

export default SearchPage;
