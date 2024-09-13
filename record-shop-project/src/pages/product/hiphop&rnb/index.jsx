import React from 'react';

// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Dynamic Component
import dynamic from 'next/dynamic';
const DynamicProductItem = dynamic(
	() => import('@/components/product/ProductItem'),
);

// Components
import Search from '@/components/search/Search';

// API
import { fetchHiphopRnbProducts } from '@/pages/api';

// Hooks
import { useEffect, useState } from 'react';

export async function getStaticProps() {
	const data = await fetchHiphopRnbProducts();

	return {
		props: {
			data,
		},
	};
}

const HiphopRnbPage = React.memo(function HiiphopRnbPage({ data }) {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		setMusic(data);
	}, []);

	return (
		<>
			<Search />
			<h3 className={styles.title}>Hiphop / R&B</h3>
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

HiphopRnbPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default HiphopRnbPage;
