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
import { fetchNuDiscoModernFunkProducts } from '@/api';

export async function getServerSideProps() {
	const data = await fetchNuDiscoModernFunkProducts();

	return {
		props: {
			data,
		},
	};
}

const NuDiscoAndModernFunkPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const nuDiscoAndModernFunk = data.children.props.data;
		setMusic(nuDiscoAndModernFunk);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>NU Disco / Modern Funk</h3>

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

NuDiscoAndModernFunkPage.getLayout = function getLayout(page) {
	return <NuDiscoAndModernFunkPage>{page}</NuDiscoAndModernFunkPage>;
};

export default NuDiscoAndModernFunkPage;
