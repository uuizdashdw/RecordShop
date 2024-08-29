// API
import { fetchAllProducts } from '@/api';

// Hooks
import { useEffect } from 'react';

// Components
import MainLayout from '@/layouts/MainLayout';
import ProductItem from '@/components/product/ProductItem';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '@/store';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import styles from './index.module.css';

// Link
import Link from 'next/link';

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

	useEffect(() => {
		dispatchProduct();
	}, [data]);

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
													<ProductItem product={item} />
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
