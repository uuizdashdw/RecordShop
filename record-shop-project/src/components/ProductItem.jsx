import Image from 'next/image';

import styles from './css/productItem.module.css';

const ProductItem = ({ product }) => {
	return (
		<>
			<Image
				src={product.imageUrl}
				alt={product.name}
				width={200}
				height={200}
				className={styles.img}
			></Image>
			<p className={styles.title}>{product.name}</p>
			<p className={styles.price}>
				{product.priceOff
					? product.aboutItem.quntityInfo.price
					: product.price + '원'}
			</p>
		</>
	);
};

export default ProductItem;
