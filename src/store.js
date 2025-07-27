import {configureStore} from '@reduxjs/toolkit';
import {addReducers, removeReducers} from 'RepackHostApp/SharedRedux';

import categorySlice from '../store/categorySlice';
import todoSlice from '../store/todoSlice';

export const allReducers = {
  todos: todoSlice.reducer,
  category: categorySlice.reducer,
};
export const initMiniAppStore = () => {
  console.log('🚀 Initializing Mini App reducers...');
  // addReducers(allReducers, {
  //   persist: ['user', 'dashboard'],
  //   persistKey: 'miniApp',
  // });
  addReducers(allReducers);
};

export const cleanupMiniAppStore = () => {
  console.log('🧹 Cleaning up Mini App reducers...');

  // 1. Remove reducers from shared store
  const reducerNames = Object.keys(allReducers);
  removeReducers(reducerNames);

  // 2. Optional: Clear persisted data
  // AsyncStorage.removeItem('persist:miniApp');

  // 3. Optional: Clear specific keys
  // AsyncStorage.multiRemove(['persist:miniApp', 'persist:user']);

  console.log('✅ Mini App cleanup completed');
  console.log('🗑️ Removed reducers:', reducerNames);
};

export const store = configureStore({
  reducer: allReducers,
});
