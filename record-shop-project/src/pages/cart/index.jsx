import CartLayout from '@/layouts/CartLayout';

const CartPage = () => {
	return (
		<CartLayout>
			<h1>Cart Page!!</h1>
		</CartLayout>
	);
};

CartPage.getLayout = function getLayout(page) {
	return <CartPage>{page}</CartPage>;
};

export default CartPage;
