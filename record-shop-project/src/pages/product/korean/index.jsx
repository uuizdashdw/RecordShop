import React from 'react';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Dynamic Component
import dynamic from 'next/dynamic';
const DynamicProductItem = dynamic(
	() => import('@/components/product/ProductItem'),
);

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchKoreanProducts } from '@/pages/api';

// CSS
import styles from './index.module.css';
import Search from '@/components/search/Search';

export async function getStaticProps() {
	const data = await fetchKoreanProducts();

	return {
		props: {
			data,
		},
	};
}

const KoreanPage = React.memo(function KoreanPage({ data }) {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		setMusic(data);
	}, [data]);

	return (
		<>
			<Search placeholder={'찾으시는 상품이 있으신가요?'} />
			<h3 className={styles.title}>Korean</h3>

			<ul className={styles.musicList}>
				{music.map((item, index) => (
					<li key={index}>
						<DynamicProductItem product={item} />
					</li>
				))}
			</ul>
		</>
	);
});

KoreanPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default KoreanPage;
