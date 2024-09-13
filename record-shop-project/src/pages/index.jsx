import React from 'react';

// API
import { fetchAllProducts } from '@/pages/api';

// Hooks
import { useEffect } from 'react';

// Components
import MainLayout from '@/layouts/MainLayout';
import Search from '@/components/search/Search';

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

// 전체 상품 SSG
export async function getStaticProps() {
	const products = await fetchAllProducts();

	return {
		props: {
			products,
		},
	};
}

const MainPage = React.memo(function MainPage({ products }) {
	const dispatch = useDispatch();
	const dispatchList = useSelector(state => state.products.products);

	const dispatchProduct = () => {
		dispatch(updateProducts([...products]));
	};

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
				return '';
			// return genre.charAt(0).toUpperCase() + genre.slice(1);
		}
	};

	useEffect(() => {
		dispatchProduct();
	}, []);

	return (
		<>
			<Search placeholder={'찾으시는 상품이 있으신가요?'} />
			<ul>
				{dispatchList.map(({ genre, products }, index) => (
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
								{products.map((item, index) => (
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
		</>
	);
});

MainPage.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default MainPage;
