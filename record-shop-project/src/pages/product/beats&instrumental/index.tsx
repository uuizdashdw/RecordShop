import React from 'react';

// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '../../../layouts/ProductLayout';

// Dynamic Component
import dynamic from 'next/dynamic';
const DynamicProductItem = dynamic(
	() => import('../../../components/product/ProductItem'),
);

// Component
import Search from '../../../components/search/Search';

// API
import { fetchBeatsAndInstrumentalProdcuts } from '../../api';

// Hooks
import { useEffect, useState } from 'react';

// Type
// import { ProductType } from '../../../types';
import { NextPageWithLayout } from '../../../types';

export async function getStaticProps() {
	const data = await fetchBeatsAndInstrumentalProdcuts();

	return {
		props: {
			data,
		},
	};
}

const BeatsAndInstrumentalPage: NextPageWithLayout<any> = React.memo(
	function BeatsAndInstrumentalPage({ data }: any) {
		const [music, setMusic] = useState([]);

		useEffect(() => {
			setMusic(data);
		}, []);

		return (
			<>
				<Search placeholder={'찾으시는 상품이 있으신가요?'} />
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
