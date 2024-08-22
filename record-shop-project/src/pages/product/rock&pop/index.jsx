// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Components
import ProductItem from '@/components/product/ProductItem';

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchRockPopProducts } from '@/api';

export async function getServerSideProps() {
	const data = await fetchRockPopProducts();

	return {
		props: {
			data,
		},
	};
}

const RockAndPopPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const rockAndPop = data.children.props.data;

		setMusic(rockAndPop);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Rock / Pop</h3>

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

RockAndPopPage.getLayout = function getLayout(page) {
	return <RockAndPopPage>{page}</RockAndPopPage>;
};

export default RockAndPopPage;
