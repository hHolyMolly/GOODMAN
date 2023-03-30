import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from './products';

type SearchFiltersColors = {
  title: string;
};

type SearchFiltersBrands = {
  title: string;
};

type SearchFilters = {
  price: {
    min: number;
    max: number;
  };
  brands: SearchFiltersBrands[];
  colors: SearchFiltersColors[];
};

export interface SearchSliceState {
  isActive: boolean;
  value: string;
  items: CardType[];
  search_filters: SearchFilters;
}

const initialState: SearchSliceState = {
  isActive: false,
  value: '',
  items: [],
  search_filters: {
    price: {
      min: 0,
      max: 60000,
    },
    brands: [],
    colors: [],
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOpenSearch: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setSearchItems: (state, action: PayloadAction<CardType[]>) => {
      state.items = action.payload;
    },
    setSearchMinPrice: (state, action: PayloadAction<number>) => {
      state.search_filters.price.min = action.payload;
    },
    setSearchMaxPrice: (state, action: PayloadAction<number>) => {
      state.search_filters.price.max = action.payload;
    },
    setAddSearchBrand: (state, action: PayloadAction<any>) => {
      state.search_filters.brands.push({
        ...action.payload,
      });
    },
    setRemoveSearchBrand: (state, action: PayloadAction<any>) => {
      state.search_filters.brands = state.search_filters.brands.filter(
        (brand) => brand.title !== action.payload
      );
    },
  },
});

export const {
  setOpenSearch,
  setSearchValue,
  setSearchItems,
  setSearchMinPrice,
  setSearchMaxPrice,
  setAddSearchBrand,
  setRemoveSearchBrand,
} = searchSlice.actions;

export default searchSlice.reducer;
