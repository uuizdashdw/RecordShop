import React from 'react';

// Layout
import ProductDetailLayout from '@/layouts/ProductDetailLayout';

// Dynamic Components
import dynamic from 'next/dynamic';
const DynamicProductDetailItem = dynamic(
	() => import('@/components/product/ProductDetailItem'),
);

// API
import { fetchProductDetails } from '@/pages/api';

// Hooks
import { useEffect, useState, useCallback } from 'react';

// CSS
import styles from './[productId].module.css';

export async function getServerSideProps({ params }) {
	const product = await fetchProductDetails(params);
	return {
		props: {
			product,
		},
	};
}

const ProductDetailPage = React.memo(function ProductDetailPage(product) {
	const [music, setMusic] = useState({});

	const memoizedSetMusic = useCallback(
		data => {
			setMusic(data);
		},
		[product],
	);

	useEffect(() => {
		const data = product.children.props.product;
		memoizedSetMusic(data);
	}, [product]);

	return (
		<ProductDetailLayout>
			<main>
				<section className={styles.section}>
					<DynamicProductDetailItem product={music} />
				</section>
			</main>
		</ProductDetailLayout>
	);
});

ProductDetailPage.getLayout = function getLayout(page) {
	return <ProductDetailPage>{page}</ProductDetailPage>;
};

export default ProductDetailPage;
