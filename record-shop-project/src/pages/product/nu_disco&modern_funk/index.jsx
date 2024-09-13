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
import { fetchNuDiscoModernFunkProducts } from '@/pages/api';

export async function getStaticProps() {
	const data = await fetchNuDiscoModernFunkProducts();

	return {
		props: {
			data,
		},
	};
}

const NuDiscoAndModernFunkPage = React.memo(function NuDiscoAndModernFunkPage({
	data,
}) {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		setMusic(data);
	}, []);

	return (
		<>
			<Search />
			<h3 className={styles.title}>Nu Disco / Modern Funk</h3>

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

NuDiscoAndModernFunkPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default NuDiscoAndModernFunkPage;
