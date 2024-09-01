// API
import { fetchAllProducts } from '@/pages/api';

// Hooks
import { useEffect } from 'react';

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

// 전체 상품 서버 사이드 렌더링
export async function getServerSideProps() {
	const products = await fetchAllProducts();

	return {
		props: {
			products,
		},
	};
}

const MainPage = ({ products }) => {
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
				return genre.charAt(0).toUpperCase() + genre.slice(1);
		}
	};

	useEffect(() => {
		dispatchProduct();
	}, [products]);

	return (
		<>
			<MainLayout>
				<main>
					<ul>
						{dispatchList.map(({ id, products }, index) => (
							<li key={index} className={styles.genreList}>
								<h3 className={styles.title}>{getGenreTitle(id)}</h3>

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
				</main>
			</MainLayout>
		</>
	);
};

MainPage.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default MainPage;
