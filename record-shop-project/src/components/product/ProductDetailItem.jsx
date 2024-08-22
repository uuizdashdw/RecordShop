// Image
import Image from 'next/image';

// CSS
import styles from '../css/productDetailItem.module.css';

// Components
import Button from '../buttons/Button';
import ProductDetailText from './ProductDetailText';
import ProductPlaylist from './ProductPlaylist';

// Hooks
import { useEffect, useState } from 'react';

const ProductDetailItem = ({ product }) => {
	return (
		<div>
			<div className={styles.product_wrapper}>
				<div style={{ display: 'flex' }}>
					<Image
						src={product.imageUrl}
						width={450}
						height={450}
						alt={product.name}
					/>
				</div>
				<div className={styles.info_wrapper}>
					<ProductDetailText product={product} />
					<Button product={product} />
				</div>
			</div>
			<ProductPlaylist product={product} />
		</div>
	);
};

export default ProductDetailItem;
