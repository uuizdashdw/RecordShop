// CSS
import styles from '../css/button.module.css';

// Router
import { useRouter } from 'next/router';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCarts, setUserInfo } from '../../store';

// Hook
import { useEffect } from 'react';

const Button = ({ product }: any) => {
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.users.userInfo);

	const router = useRouter();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('user') as any);
		userInfo && dispatch(setUserInfo(userInfo));
	}, [dispatch]);

	const checkAuthHandler = () => {
		if (
			!user &&
			confirm(
				'회원가입이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?',
			)
		) {
			router.push('/auth/signin');
		}
		return user ? true : false;
	};

	const putInCartHandler = (product: any) => {
		const auth = checkAuthHandler();
		if (auth && confirm('장바구니에 추가하시겠습니까?')) {
			const carts = JSON.parse(localStorage.getItem('carts') as any);
			const existingIndex = carts.findIndex(
				(item: any) => item.id === Number(product.id),
			);

			if (existingIndex !== -1) {
				carts[existingIndex].quantity += 1;
			} else {
				product.quantity = 1;
				carts.push(product);
			}

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
								? `${styles.cart_button_disabled}`
								: `${styles.cart_button}`
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
