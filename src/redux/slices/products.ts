import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CardType = {
  id: number;
  title: string;
  availability: boolean;
  images: {
    url: string;
  }[];
  brand: string;
  price: {
    old: number;
    stock: boolean;
    actual: number;
  };
  color_value: string;
  color_title: string;
  colors: {
    value: string;
    value_title: string;
    style: string;
  }[];
  rating: number;
  reviews: [];
};

export interface ProductsSliceState {
  items: CardType[];
}

const initialState: ProductsSliceState = {
  items: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoadProducts: (state, action: PayloadAction<CardType[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setLoadProducts } = productsSlice.actions;

export default productsSlice.reducer;
