import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
type Rating = {
	rate: number;
	count: number;
};

type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: Rating;
};
type InitialState = { products: Product[] };

const initialState: InitialState = {
	products: [],
};

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		updateProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		searchProducts: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter((product) => product.title.toLowerCase().includes(action.payload.toLowerCase()));
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateProducts, searchProducts } = productSlice.actions;

export default productSlice.reducer;
