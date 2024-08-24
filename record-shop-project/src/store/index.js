import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialStateProduct = {
	products: [],
};

const initialStateCarts = {
	carts: [],
};

const productSlice = createSlice({
	name: 'products',
	initialState: initialStateProduct,
	reducers: {
		updateProducts(state, action) {
			state.products = action.payload;
		},
	},
});

const cartSlide = createSlice({
	name: 'carts',
	initialState: initialStateCarts,
	reducers: {
		setInitialCarts(state, action) {
			state.carts = action.payload;
		},
		addToCarts(state, action) {
			// 동일 아이템 확인
			const existingItem = state.carts.find(
				item => item.name === action.payload.name,
			);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				// 새로운 아이템 추가
				const newItem = {
					id: state.carts.length + 1, // 새로운 아이템의 ID
					name: action.payload.name, // action.payload에서 이름 가져오기
					price: action.payload.priceOff
						? Number(
								(action.payload.aboutItem?.quntityInfo.price)
									.match(/\d+/g)
									.join(''),
							)
						: Number(action.payload.price.replace(/,/g, '')),
					imageUrl: action.payload.imageUrl,
					quantity: 1, // 새로운 아이템 수량 1
					quantityTerm: action.payload.quantityTerms,
				};
				state.carts.push(newItem); // 새로운 아이템 추가
			}
			localStorage.setItem('carts', JSON.stringify(state.carts));
		},

		changeCartItemQuantity(state, action) {
			const { name, quantity } = action.payload;

			const updatedCarts = state.carts.map(item => {
				if (item.name === name) return { ...item, quantity };
				return item;
			});

			state.carts = updatedCarts;

			localStorage.setItem('carts', JSON.stringify(updatedCarts));
		},

		removeCartsItem(state, action) {
			const updatedCarts = state.carts.filter(
				item => item.id !== action.payload.id,
			);

			state.carts = updatedCarts;
			localStorage.setItem('carts', JSON.stringify(updatedCarts));
		},
		clearCarts(state) {
			state.carts = [];
			localStorage.setItem('carts', JSON.stringify([]));
		},
	},
});

const store = configureStore({
	reducer: {
		products: productSlice.reducer,
		carts: cartSlide.reducer,
	},
});

export const { updateProducts } = productSlice.actions;
export const {
	addToCarts,
	removeCartsItem,
	clearCarts,
	changeCartItemQuantity,
	setInitialCarts,
} = cartSlide.actions;

export default store;
