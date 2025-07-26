import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addReducer} from 'RepackHostApp/SharedRedux';

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateCategory: (
      state,
      action: PayloadAction<{id: string; changes: Partial<Category>}>,
    ) => {
      const index = state.categories.findIndex(
        category => category.id === action.payload.id,
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload.changes,
        };
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload,
      );
    },
    clearError: state => {
      state.error = null;
    },
  },
});

addReducer('category', categorySlice.reducer);

export const {
  setLoading,
  setError,
  addCategory,
  updateCategory,
  deleteCategory,
  clearError,
} = categorySlice.actions;

export default categorySlice;
export type {Category, CategoryState};
