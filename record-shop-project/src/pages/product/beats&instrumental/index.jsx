// CSS
import styles from './index.module.css';

// Layout
import ProductLayout from '@/layouts/ProductLayout';

// Components
import ProductItem from '@/components/product/ProductItem';

// API
import { fetchBeatsAndInstrumentalProdcuts } from '@/api';

// Hooks
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
	const data = await fetchBeatsAndInstrumentalProdcuts();

	return {
		props: {
			data,
		},
	};
}

const BeatsAndInstrumentalPage = data => {
	const [music, setMusic] = useState([]);

	useEffect(() => {
		const beatsInstrumental = data.children.props.data;
		setMusic(beatsInstrumental);
	}, []);

	return (
		<ProductLayout>
			<h3 className={styles.title}>Beats / Instrumental</h3>

			<ul className={styles.musicList}>
				{music.map((item, index) => (
					<li key={index}>
						<ProductItem product={item} />
					</li>
				))}
			</ul>
		</ProductLayout>
	);
};

BeatsAndInstrumentalPage.getLayout = function getLayout(page) {
	return <BeatsAndInstrumentalPage>{page}</BeatsAndInstrumentalPage>;
};

export default BeatsAndInstrumentalPage;
