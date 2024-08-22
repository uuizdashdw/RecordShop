// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Components
import ProductItem from '@/components/product/ProductItem';

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchSoundtrackProducts } from '@/api';

export async function getServerSideProps() {
	const data = await fetchSoundtrackProducts();
	return {
		props: {
			data,
		},
	};
}

const SoundtrackPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const soundtrack = data.children.props.data;
		setMusic(soundtrack);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Soundtrack</h3>

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

SoundtrackPage.getLayout = function getLayout(page) {
	return <SoundtrackPage>{page}</SoundtrackPage>;
};

export default SoundtrackPage;
