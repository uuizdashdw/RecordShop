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
import { fetchKoreanProducts } from '@/pages/api';

// CSS
import styles from './index.module.css';

export async function getServerSideProps() {
	const data = await fetchKoreanProducts();

	return {
		props: {
			data,
		},
	};
}

const KoreanPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const korean = data.children.props.data;
		console.log('### product LIST', korean);
		setMusic(korean);
	}, [data]);

	return (
		<>
			<ProductLayout>
				<h3 className={styles.title}>Korean</h3>

				<ul className={styles.musicList}>
					{music.map((item, index) => (
						<li key={index}>
							<DynamicProductItem product={item} />
						</li>
					))}
				</ul>
			</ProductLayout>
		</>
	);
};

KoreanPage.getLayout = function getLayout(page) {
	return <KoreanPage>{page}</KoreanPage>;
};

export default KoreanPage;
