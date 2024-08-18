// API
import { fetchAllProducts } from '@/api';

// Hooks
import { useEffect, useState } from 'react';

// Components
import MainLayout from '@/layouts/MainLayout';
import ProductItem from '@/components/ProductItem';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '@/store';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import styles from './index.module.css';

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

	// Swiper
	// SwiperCore.use([Navigation, Scrollbar, Autoplay]);

	return (
		<>
			<MainLayout>
				<main>
					<ul>
						{dispatchList.map(([genre, songs], index) => (
							<li key={index} className={styles.genreList}>
								<h3 className={styles.title}>{genre.toUpperCase()}</h3>

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
