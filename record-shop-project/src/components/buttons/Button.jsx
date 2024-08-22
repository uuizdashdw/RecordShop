// CSS
import styles from '../css/button.module.css';

// API
import { fetchProductPutInCart, fetchProductsInCart } from '@/api';

// Router
import { useRouter } from 'next/router';

const Button = ({ product }) => {
	const router = useRouter();

	const putInCartHandler = async () => {
		const { data } = await fetchProductPutInCart(product);
		console.log(data);
		alert(`${data.name} (이)가 장바구니에 추가되었습니다.`);
		router.push('/cart');
	};

	return (
		<>
			<ul className={styles.button_wrapper}>
				<li className={styles.button_list}>
					<button
						className={
							!product.inventory
								? styles.buy_button_disabled
								: styles.buy_button
						}
						disabled={!product.inventory}
					>
						구매하기
					</button>
				</li>
				<li className={styles.button_list}>
					<button
						className={
							!product.inventory
								? styles.cart_button_disabled
								: styles.cart_button
						}
						disabled={!product.inventory}
						onClick={() => putInCartHandler(product)}
					>
						장바구니 담기
					</button>
				</li>
			</ul>
		</>
	);
};

export default Button;
