// API
import { fetchAllProducts } from '@/api';

// Hooks
import { useEffect, useState } from 'react';

// Components
import MainLayout from '@/layouts/MainLayout';

// Swipers
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '@/store';

// CSS
import styles from './index.module.css';

// Dynamic Import
import dynamic from 'next/dynamic';
// ProductItem
const DynamicProductItem = dynamic(
	() => import('@/components/product/ProductItem'),
);

// Dynamic Head Module
const DynamicHeadModule = dynamic(
	() => import('@/components/common/HeadModule'),
);

import { useRouter } from 'next/router';

// 전체 상품 서버 사이드 렌더링
export async function getServerSideProps() {
	const { data } = await fetchAllProducts();

	return {
		props: {
			data,
		},
	};
}

const MainPage = ({ data }) => {
	const dispatch = useDispatch();
	const dispatchList = useSelector(state => state.products.products);

	const dispatchProduct = () => {
		const productList = Object.entries(data);
		dispatch(updateProducts(productList));
	};

	const [metaData, setMetaData] = useState({
		title: '',
		description: '',
		keywords: '',
		imageUrl: '',
		url: '',
	});

	const [nowPath, setNowPath] = useState('');
	const router = useRouter();

	const getGenreTitle = genre => {
		switch (genre) {
			case 'korean':
				return 'Korean';
			case 'hiphop&rnb':
				return 'Hiphop / R&B';
			case 'beats&instrumental':
				return 'Beats / Instrumental';
			case 'soul&funk&disco':
				return 'Soul / Funk / Disco';
			case 'nu_disco&modern_funk':
				return 'Nu Disco / Modern Funk';
			case 'rock&pop':
				return 'Rock / Pop';
			default:
				return genre.charAt(0).toUpperCase() + genre.slice(1);
		}
	};

	useEffect(() => {
		dispatchProduct();
		// setMetaData({
		// 	title: 'Wiz Records',
		// 	description: '레코드 전문 판매',
		// 	keywords: '레코드, LP, Music',
		// 	imageUrl:
		// 		'https://img.freepik.com/premium-vector/vector-illustration-vinyl-record-black_786040-379.jpg?w=996',
		// 	url: '',
		// });
	}, [data]);

	return (
		<>
			<MainLayout>
				<main>
					<ul>
						{dispatchList.map(([genre, songs], index) => (
							<li key={index} className={styles.genreList}>
								<h3 className={styles.title}>{getGenreTitle(genre)}</h3>

								<Swiper
									modules={[Navigation, Pagination]}
									spaceBetween={0}
									slidesPerView={6}
									navigation
									pagination={{ clickable: true }}
								>
									<div className={styles.productList}>
										{songs.map((item, index) => (
											<SwiperSlide key={index}>
												<div>
													<DynamicProductItem product={item} />
												</div>
											</SwiperSlide>
										))}
									</div>
								</Swiper>
							</li>
						))}
					</ul>
				</main>
			</MainLayout>
		</>
	);
};

MainPage.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default MainPage;
