// CSS
import styles from '../css/button.module.css';

// Router
import { useRouter } from 'next/router';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setInitialCarts, addToCarts } from '@/store';

const Button = ({ product }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const putInCartHandler = product => {
		if (confirm('장바구니에 추가하시겠습니까?')) {
			const carts = JSON.parse(localStorage.getItem('carts'));
			const existingIndex = carts.findIndex(
				item => item.id === Number(product.id),
			);

			if (existingIndex !== -1) {
				carts[existingIndex].quantity += 1;
			} else {
				product.quantity = 1;
				carts.push(product);
			}

			localStorage.setItem('carts', JSON.stringify(carts));
			dispatch(addToCarts(product));

			alert(`${product.name} (이)가 장바구니에 추가되었습니다.`);

			router.push('/cart');
		}
	};

	return (
		<>
			<ul className={styles.button_wrapper}>
				<li className={styles.button_list}>
					<button
						className={
							!product.inventory
								? `${styles.buy_button_disabled}`
								: `${styles.buy_button}`
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
								? `${styles.buy_button_disabled}`
								: `${styles.buy_button}`
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
