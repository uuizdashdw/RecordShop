// Components
import CartLayout from '../../layouts/CartLayout';

// Hooks
import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';

// CSS
import styles from './index.module.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	changeCartItemQuantity, // 수량변경
	setInitialCarts, // 기본 장바구니 설정
	removeCartsItem, // 장바구니에서 삭제
	clearCarts, // 장바구니 모두 비우기
} from '../../store';

const CartPage = () => {
	const [totalAmount, setTotalAmout] = useState(0);
	const [finalTotalAmout, setFinalTotalAmout] = useState(0);
	const [isClear, setIsClear] = useState(false);

	const cartItems = useSelector((state: any) => state.carts.carts);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!cartItems.length) {
			const carts = JSON.parse(localStorage.getItem('carts') as any);

			dispatch(setInitialCarts(carts));
		} else {
			dispatch(setInitialCarts([...cartItems]));
		}
	}, []);

	// Item Qauntity Change Handler
	const itemCountHandle = (item: any, event: any) => {
		const newQuantity = Number(event.target.value);

		if (item.quantityTerm && newQuantity > 2) {
			alert('해당 상품은 1인 최대 구매수량이 2장입니다.');
			return;
		}

		dispatch(
			changeCartItemQuantity({ name: item.name, quantity: newQuantity }),
		);
	};

	// Remove Item In Cart
	const removeCartItem = (item: any) => {
		if (confirm('장바구니에서 삭제하시겠습니까?')) {
			dispatch(removeCartsItem(item));
			setIsClear(true);
		}
	};

	// Clear All Items in Cart
	const clearAllCartItem = () => {
		if (!cartItems.length) alert('장바구니가 이미 비어있습니다.');
		if (
			cartItems.length &&
			confirm('장바구니에 담긴 상품이 모두 제거됩니다. 진행하시겠습니까?')
		) {
			dispatch(clearCarts());
			setIsClear(true);
		}
	};

	// removeCartItem(), clearAllCartItem() 함수에 반응
	useEffect(() => {
		if (isClear && !cartItems.length) {
			alert('삭제 되었습니다.');
			setIsClear(false);
		}
	}, [cartItems]);

	// Calculate Total Amount
	const totalAmountHandle = () => {
		return cartItems.reduce((total: any, item: any) => {
			if (item.priceOff) {
				return (
					total +
					Number(
						item.aboutItem?.quntityInfo.price.match(/\d+/g).join('') *
							item.quantity,
					)
				);
			} else {
				return Number(total + item.price * item.quantity);
			}
		}, 0);
	};

	// Calculate Total Amout and Delivery Fee
	const finalTotalAmoutHandle = (total: any) => {
		const final = total >= 70000 || total === 0 ? total : total + 3000;
		return final;
	};

	useEffect(() => {
		// 총 물건 값
		const totalPrice = totalAmountHandle();
		setTotalAmout(totalPrice);

		// 물건 + 배송료
		const finalPrice = finalTotalAmoutHandle(totalPrice);
		setFinalTotalAmout(finalPrice);
	}, [cartItems]);

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>장바구니</h3>
			<div className={styles.cart_clear_button_wrapper}>
				<button className={styles.cart_clear_button} onClick={clearAllCartItem}>
					장바구니 비우기
				</button>
			</div>
			<ul className={styles.cart}>
				{[...cartItems].reverse().map((item, index) => (
					<li key={index} className={styles.cartlist}>
						<div className={styles.cart_wrapper}>
							<div>
								<Image
									src={item.imageUrl}
									alt={item.name}
									width={150}
									height={150}
								/>
							</div>
							<div className={styles.cart_item_info}>
								<p className={styles.item_title}>{item.name}</p>

								<div className={styles.quantity_wrapper}>
									<span className={styles.item_text}>수량 : </span>
									<select
										className={styles.select_box}
										value={item.quantity}
										onChange={event => itemCountHandle(item, event)}
									>
										{[...Array(10)].map((_, count) => (
											<option key={count + 1} value={count + 1}>
												{count + 1}
											</option>
										))}
									</select>
								</div>
								<p className={styles.item_text}>
									예상 결제 금액 :{' '}
									{item.priceOff
										? (
												(item.aboutItem?.quntityInfo.price)
													.match(/\d+/g)
													.join('') * item.quantity
											).toLocaleString()
										: (item.price * item.quantity).toLocaleString()}
									원
								</p>
							</div>
						</div>
						<div>
							<button
								className={styles.delete_btn}
								onClick={() => removeCartItem(item)}
							>
								삭제
							</button>
						</div>
					</li>
				))}
			</ul>

			<div className={styles.amount_info}>
				<ul className={styles.amount_info_list}>
					<li className={styles.amount_info_list_item}>
						<span className={styles.amount_info_title}>결제 금액 : </span>
						<span className={styles.payment}>
							{totalAmount.toLocaleString()} 원
						</span>
					</li>
					<li>
						<span className={styles.amount_info_title}>배송비 : </span>
						{totalAmount >= 70000 || !totalAmount ? (
							<span className={styles.payment}>0 원</span>
						) : (
							<span className={styles.payment}>3,000 원</span>
						)}
					</li>
					<li className={styles.final_total_amout}>
						<span className={styles.amount_info_title}>총 결제 금액 : </span>
						<span className={styles.payment}>
							{finalTotalAmout.toLocaleString()} 원
						</span>
					</li>
				</ul>
			</div>
			<div className={styles.order_button_wrapper}>
				<button className={styles.order_button}>주문하기</button>
			</div>
		</div>
	);
};

CartPage.getLayout = function getLayout(page: ReactNode) {
	return <CartLayout>{page}</CartLayout>;
};

export default CartPage;
