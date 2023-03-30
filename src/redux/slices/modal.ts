import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalSliceState {
  isActive: Partial<string | boolean>;
}

const initialState: ModalSliceState = {
  isActive: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<string>) => {
      state.isActive = action.payload;
    },
    setCloseModal: (state) => {
      state.isActive = false;
    },
  },
});

export const { setOpenModal, setCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
