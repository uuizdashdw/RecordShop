// CSS
import styles from '../css/productDetailText.module.css';

const ProductDetailText = ({ product }) => {
	return (
		<div>
			<h1 className={styles.title}>{product.name}</h1>

			<p className={styles.product_info}>{product.productType}</p>
			<p className={styles.product_info}>
				{product.company + ', ' + product.pressingYear}
			</p>
			<p className={styles.product_info}>{product.usedType}</p>
			<p className={styles.product_info}>
				{product.priceOff ? (
					<span>
						<span className={styles.price}>
							{product.aboutItem.quntityInfo.price}
						</span>{' '}
						<span className={styles.price_off}>{product.price}원</span>
					</span>
				) : (
					product.price + '원'
				)}
			</p>
			<ul>
				<li className={styles.product_sub_info_list}>
					<p className={styles.product_sub_info_title}>적립금</p>
					<p className={styles.product_sub_info_content}>3%</p>
				</li>
				<li className={styles.product_sub_info_list}>
					<p className={styles.product_sub_info_title}>배송비</p>
					<div className={styles.delivery_text_wrapper}>
						<p className={styles.product_sub_info_content}>
							3,000원 (70,000원 이상 구매 시 무료)
						</p>
						<p className={styles.product_sub_info_content}>
							제주 및 도서 산간 3,000원 추가
						</p>
					</div>
				</li>

				{product.quantityTerms ? (
					<li className={styles.product_sub_info_list}>
						<p className={styles.product_sub_info_title}>수량조건</p>
						<div className={styles.delivery_text_wrapper}>
							<p className={styles.product_sub_info_content}>주문당 최대 2개</p>
							<p className={styles.product_sub_info_content}>회원당 최대 2개</p>
						</div>
					</li>
				) : (
					''
				)}
			</ul>

			{!product.inventory ? (
				<p className={styles.no_inventory}>품절된 상품입니다.</p>
			) : (
				''
			)}
		</div>
	);
};

export default ProductDetailText;
