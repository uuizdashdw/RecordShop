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

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchRockPopProducts } from '@/pages/api';

export async function getStaticProps() {
	const data = await fetchRockPopProducts();

	return {
		props: {
			data,
		},
	};
}

const RockAndPopPage = React.memo(function RockAndPopPage(data) {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const rockAndPop = data.children.props.data;
		setMusic(rockAndPop);
	}, []);

	return (
		<>
			<Search />
			<h3 className={styles.title}>Rock / Pop</h3>

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

RockAndPopPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default RockAndPopPage;
