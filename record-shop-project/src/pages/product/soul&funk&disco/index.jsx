// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Components
import ProductItem from '@/components/product/ProductItem';

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchSoulFUnkDiscoProducts } from '@/api';

export async function getServerSideProps() {
	const data = await fetchSoulFUnkDiscoProducts();

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
						<ProductItem product={item} />
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
