// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Componenets
import ProductItem from '@/components/product/ProductItem';

// API
import { fetchJazzProducts } from '@/api';

// Hooks
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
	const data = await fetchJazzProducts();

	return {
		props: {
			data,
		},
	};
}

const JazzPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const jazz = data.children.props.data;
		setMusic(jazz);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Jazz Page</h3>

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

JazzPage.getLayout = function getLayout(page) {
	return <JazzPage>{page}</JazzPage>;
};

export default JazzPage;
