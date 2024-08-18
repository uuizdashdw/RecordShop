// API
import { fetchAllProducts } from '@/api';

// Hooks
import { useEffect, useState } from 'react';

// Components
import MainLayout from '@/layouts/MainLayout';
import ProductItem from '@/components/ProductItem';

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
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const productList = Object.entries(data);
		setProducts(productList);
	}, [data]);

	return (
		<>
			<MainLayout>
				<main>
					<ul>
						{products.map(([genre, songs], index) => (
							<li key={index} className={styles.genreList}>
								<h3 className={styles.title}>{genre.toUpperCase()}</h3>

								<ul className={styles.productList}>
									{songs.map((item, index) => (
										<li key={index}>
											<ProductItem product={item} />
										</li>
									))}
								</ul>
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
