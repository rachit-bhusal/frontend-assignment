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

type InitialState = { products: Product[]; searchResults: Product[] };

const initialState: InitialState = {
	products: [],
	searchResults: [],
};

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		updateProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		searchProducts: (state, action: PayloadAction<string>) => {
			const search = action.payload;
			state.searchResults = state.products.filter((product) => {
				return product.title.toLowerCase().includes(search.toLowerCase());
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateProducts, searchProducts } = productSlice.actions;

export default productSlice.reducer;
