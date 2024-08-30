// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Dynamic Component
import dynamic from 'next/dynamic';
const DynamicProductItem = dynamic(
	() => import('@/components/product/ProductItem'),
);

// API
import { fetchHiphopRnbProducts } from '@/api';

// Hooks
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
	const data = await fetchHiphopRnbProducts();

	return {
		props: {
			data,
		},
	};
}

const HiphopRnbPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const hiphopMusic = data.children.props.data;
		setMusic(hiphopMusic);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Hiphop / R&B</h3>
			<ul className={styles.musicList}>
				{music.map((item, index) => (
					<li key={index}>
						<DynamicProductItem product={item} />
					</li>
				))}
			</ul>
		</ProductLayout>
	);
};

HiphopRnbPage.getLayout = function getLayout(page) {
	return <HiphopRnbPage>{page}</HiphopRnbPage>;
};

export default HiphopRnbPage;
