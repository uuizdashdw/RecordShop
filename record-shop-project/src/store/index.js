import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		updateProducts(state, action) {
			state.products = action.payload;
		},
	},
});

const store = configureStore({
	reducer: {
		products: productSlice.reducer,
	},
});

export const { updateProducts } = productSlice.actions;

export default store;
