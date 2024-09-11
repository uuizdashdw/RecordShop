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
import { fetchJazzProducts } from '@/pages/api';

// Hooks
import { useEffect, useState } from 'react';

export async function getStaticProps() {
	const data = await fetchJazzProducts();

	return {
		props: {
			data,
		},
	};
}

const JazzPage = React.memo(function JazzPage(data) {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const jazz = data.children.props.data;
		setMusic(jazz);
	}, []);

	return (
		<>
			<Search />
			<h3 className={styles.title}>Jazz Page</h3>

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

JazzPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default JazzPage;
