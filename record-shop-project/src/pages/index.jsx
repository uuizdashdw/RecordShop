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
		console.log(data);
		const productList = Object.entries(data);
		dispatch(updateProducts(productList));
	};

	useEffect(() => {
		dispatchProduct();
	}, [data]);

	const getGenreTitle = genre => {
		switch (genre) {
			case 'koreanMusic':
				return 'Korean';
			case 'hiphopRnb':
				return 'Hiphop / R&B';
			case 'beatsInstrumental':
				return 'Beats / Instrumental';
			case 'soulFunkDisco':
				return 'Soul / Funk / Disco';
			case 'nuDiscoModernFunk':
				return 'Nu Disco / Modern Funk';
			case 'rockPop':
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
													<Link href={`product/${item.category}/${item.id}`}>
														<ProductItem product={item} />
													</Link>
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
