import React from 'react';

// API
// import { fetchAllProducts } from '@/pages/api';
import { fetchAllProducts } from './api';

// Hooks
import { useEffect } from 'react';

// Components
// import MainLayout from '@/layouts/MainLayout';
import MainLayout from '../layouts/MainLayout';
import Search from '../components/search/Search';

// Swipers
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateProducts } from '../store';

// CSS
import styles from './index.module.css';

// Dynamic Import
import dynamic from 'next/dynamic';
import Link from 'next/link';
// ProductItem
const DynamicProductItem = dynamic(
	() => import('../components/product/ProductItem'),
);

// type
import { NextPageWithLayout, AllProductsType, Genre } from '../types';

interface MainPageProps {
	allProducts: AllProductsType;
}

// 전체 상품 SSG
export async function getStaticProps() {
	const allProducts = await fetchAllProducts();
	return {
		props: {
			allProducts,
		},
	};
}

const MainPage: NextPageWithLayout<MainPageProps> = React.memo(
	function MainPage({ allProducts }) {
		const dispatch = useDispatch();
		const dispatchList = useSelector(
			(state: RootState) => state.products.products,
		);

		const dispatchProduct = () => {
			if (JSON.stringify(dispatchList) !== JSON.stringify(allProducts)) {
				dispatch(updateProducts([...allProducts]));
			}
		};

		const genreTitles: Genre = {
			korean: 'Korean',
			jazz: 'Jazz',
			soundtrack: 'Soundtrack',
			'hiphop&rnb': 'Hiphop / R&B',
			'beats&instrumental': 'Beats / Instrumental',
			'soul&funk&disco': 'Soul / Funk / Disco',
			'nu_disco&modern_funk': 'Nu Disco / Modern Funk',
			'rock&pop': 'Rock / Pop',
		};

		const getGenreTitle = (genre: keyof Genre) => genreTitles[genre] || genre;

		useEffect(() => {
			dispatchProduct();
			console.log('### DISPATCH ==> ', dispatchList);
		}, [allProducts]);

		return (
			<>
				<Search placeholder={'찾으시는 상품이 있으신가요?'} />
				<ul>
					{dispatchList.map(({ id, products }: any) => (
						<li key={id} className={styles.genreList}>
							<h3 className={styles.title}>
								<Link href={`/product/${id}`}>{getGenreTitle(id)}</Link>
							</h3>
							<Swiper
								modules={[Navigation, Pagination]}
								spaceBetween={0}
								slidesPerView={6}
								navigation
								pagination={{ clickable: true }}
							>
								<div className={styles.productList}>
									{Array.isArray(products) &&
										products.map(item => (
											<SwiperSlide key={item.id}>
												<DynamicProductItem product={item} />
											</SwiperSlide>
										))}
								</div>
							</Swiper>
						</li>
					))}
				</ul>
			</>
		);
	},
);

MainPage.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default MainPage;
