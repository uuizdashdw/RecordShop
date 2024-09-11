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

// Component
import Search from '@/components/search/Search';

// API
import { fetchBeatsAndInstrumentalProdcuts } from '@/pages/api';

// Hooks
import { useEffect, useState } from 'react';

export async function getStaticProps() {
	const data = await fetchBeatsAndInstrumentalProdcuts();

	return {
		props: {
			data,
		},
	};
}

const BeatsAndInstrumentalPage = React.memo(
	function BeatsAndInstrumentalPage(data) {
		const [music, setMusic] = useState([]);

		useEffect(() => {
			const beatsInstrumental = data.children.props.data;
			setMusic(beatsInstrumental);
		}, []);

		return (
			<>
				<Search />
				<h3 className={styles.title}>Beats / Instrumental</h3>

				<ul className={styles.musicList}>
					{music.map((item, index) => (
						<li key={index}>
							<DynamicProductItem product={item} />
						</li>
					))}
				</ul>
			</>
		);
	},
);

BeatsAndInstrumentalPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default BeatsAndInstrumentalPage;
