import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../css/productItem.module.css';

const ProductItem = React.memo(function ProductItem({ product }) {
	return (
		<>
			<Link href={`/product/${product.category}/${product.id}`}>
				<Image
					src={product.imageUrl}
					alt={product.name || '상품 이미지'}
					width={200}
					height={200}
					className={styles.img}
				/>
				<p className={styles.title}>{product.name}</p>
				<p className={styles.price}>
					{product.priceOff
						? product.aboutItem.quntityInfo.price
						: (product.price ? product.price.toLocaleString() : '가격 없음') +
							'원'}
				</p>
			</Link>
		</>
	);
});

export default ProductItem;
