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
import { fetchKoreanProducts } from '@/api';

// CSS
import styles from './index.module.css';

// Dynamic Head Module
const DynamicHeadModule = dynamic(
	() => import('@/components/common/HeadModule'),
);

// Router
import { useRouter } from 'next/router';

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

	const [nowPath, setNowPath] = useState('');
	const router = useRouter();

	useEffect(() => {
		const korean = data.children.props.data;
		console.log('### product LIST', korean);
		setMusic(korean);
		// setNowPath(router.pathname);
	}, [data]);

	return (
		<>
			{/* <DynamicHeadModule nowPath={nowPath} /> */}
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
