// Components
import ProductItem from '@/components/ProductItem';
import ProductLayout from '@/layouts/ProductLayout';

// Hooks
import { useEffect, useState } from 'react';

// API
import { fetchKoreanProducts } from '@/api';

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
	const [koreanMusic, setKoreanMusic] = useState([]);

	useEffect(() => {
		const korean = data.children.props.data;
		setKoreanMusic(korean);
	}, [data]);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Korean</h3>

			<ul className={styles.koreanMusicList}>
				{koreanMusic.map((item, index) => (
					<li key={index}>
						<ProductItem product={item} />
					</li>
				))}
			</ul>
		</ProductLayout>
	);
};

KoreanPage.getLayout = function getLayout(page) {
	return <KoreanPage>{page}</KoreanPage>;
};

export default KoreanPage;
