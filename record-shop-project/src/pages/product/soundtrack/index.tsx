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

// Components
import Search from '../../../components/search/Search';

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchSoundtrackProducts } from '../../../pages/api';

// Type
import { NextPageWithLayout } from '../../../types';

export async function getStaticProps() {
	const data = await fetchSoundtrackProducts();
	return {
		props: {
			data,
		},
	};
}

const SoundtrackPage: NextPageWithLayout<any> = React.memo(
	function SoundtrackPage({ data }: any) {
		const [music, setMusic] = useState([]);

		useEffect(() => {
			setMusic(data);
		}, []);

		return (
			<>
				<Search placeholder={'찾으시는 상품이 있으신가요?'} />
				<h3 className={styles.title}>Soundtrack</h3>

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

SoundtrackPage.getLayout = function getLayout(page) {
	return <ProductLayout>{page}</ProductLayout>;
};

export default SoundtrackPage;
