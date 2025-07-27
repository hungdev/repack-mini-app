import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// Import functions từ host
import {addReducer} from 'RepackHostApp/SharedRedux';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoState {
  list: TodoItem[];
  loading: boolean;
  filter: 'all' | 'completed' | 'pending';
}

const initialState: TodoState = {
  list: [],
  loading: false,
  filter: 'all',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      console.log('kkk');
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload;
    },
    clearCompleted: state => {
      state.list = state.list.filter(t => !t.completed);
    },
  },
});

// Add reducer ngay khi import slice
// addReducer('todos', todoSlice.reducer);

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  setLoading,
  setFilter,
  clearCompleted,
} = todoSlice.actions;

export default todoSlice;
export type {TodoItem, TodoState};
