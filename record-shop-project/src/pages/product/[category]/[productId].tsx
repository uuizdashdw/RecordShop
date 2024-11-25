import React from 'react';

// Layout
// import ProductDetailLayout from '@/layouts/ProductDetailLayout';
import ProductDetailLayout from '../../../layouts/ProductDetailLayout';

// Dynamic Components
import dynamic from 'next/dynamic';
const DynamicProductDetailItem = dynamic(
	() => import('../../../components/product/ProductDetailItem'),
);

// API
import { fetchAllProducts, fetchProductDetails } from '../../api';

// Hooks
import { useEffect, useState, useCallback } from 'react';

// CSS
import styles from './[productId].module.css';
import { useRouter } from 'next/router';

// Type
import {
	AllProductsType,
	NextPageWithLayout,
	ParamsType,
	ProductType,
	ProductProps,
} from '../../../types';

// initial Product
import { initialProdcut } from '../../../../utils/initialProduct';

export async function getStaticPaths() {
	const categories: AllProductsType = await fetchAllProducts();

	const paths = categories.flatMap(category =>
		category.products.map(product => ({
			params: {
				category: String(category.id),
				productId: String(product.id),
			},
		})),
	);

	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params }: { params: ParamsType }) {
	const product = await fetchProductDetails(params);

	if (!product) {
		console.log('## NOT FOUND');
		return {
			notFound: true,
		};
	}
	return {
		props: {
			product,
		},
	};
}

const ProductDetailPage: NextPageWithLayout<ProductProps> = React.memo(
	function ProductDetailPage({ product }: ProductProps) {
		const [music, setMusic] = useState(initialProdcut);
		const router = useRouter();

		const memoizedSetMusic = useCallback(
			(data: ProductType) => {
				setMusic(data);
			},
			[product],
		);

		useEffect(() => {
			memoizedSetMusic(product);
		}, [product]);

		if (router.isFallback) return '로딩 중...';
		if (!product) return '문제가 발생하였습니다. 다시 시도해주세요.';

		return (
			<>
				<section className={styles.section}>
					<DynamicProductDetailItem product={music} />
				</section>
			</>
		);
	},
);

ProductDetailPage.getLayout = function getLayout(page) {
	return <ProductDetailLayout>{page}</ProductDetailLayout>;
};

export default ProductDetailPage;
