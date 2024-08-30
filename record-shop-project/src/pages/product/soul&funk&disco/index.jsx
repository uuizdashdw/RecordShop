// CSS
import styles from './index.module.css';

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
import { fetchSoulFunkDiscoProducts } from '@/api';

export async function getServerSideProps() {
	const data = await fetchSoulFunkDiscoProducts();

	return {
		props: {
			data,
		},
	};
}

const SoulFunkDiscoPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const soulFunkDisco = data.children.props.data;
		setMusic(soulFunkDisco);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Soul / Funk / Disco</h3>

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

SoulFunkDiscoPage.getLayout = function getLayout(page) {
	return <SoulFunkDiscoPage>{page}</SoulFunkDiscoPage>;
};

export default SoulFunkDiscoPage;
