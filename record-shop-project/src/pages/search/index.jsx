// CSS
import styles from './index.module.css';

// Hooks
import { useState, useEffect } from 'react';

// Components
import ProductLayout from '@/layouts/ProductLayout';

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
	const { query } = router;
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchResults = async () => {
			if (query.query) {
				const results = await fetchProductsByName(query.query);
				setProducts(results);
			}
		};

		fetchResults();
	}, [query]);

	return (
		<ProductLayout>
			<Search />
			{products.length ? (
				<>
					<h3 className={styles.title}>검색 결과</h3>
					<ul className={styles.product_list}>
						{products.map((product, index) => (
							<li key={index}>
								<DynamicProductItem product={product} />
							</li>
						))}
					</ul>
				</>
			) : (
				<div className={styles.no_result}>
					{query.query} 와(과) 관련된 상품이 없습니다.
				</div>
			)}
		</ProductLayout>
	);
};

SearchPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default SearchPage;
