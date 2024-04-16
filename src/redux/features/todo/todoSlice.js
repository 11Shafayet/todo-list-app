import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTasks: JSON.parse(localStorage.getItem('allTasks')) || [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTasksAction: (state, action) => {
      state.allTasks = action.payload;
      localStorage.setItem('allTasks', JSON.stringify(action.payload));
    },
    updateTaskStatusAction: (state, action) => {
      state.allTasks = action.payload;
      localStorage.setItem('allTasks', JSON.stringify(action.payload));
    },
    deleteTaskAction: (state, action) => {
      state.allTasks = action.payload;
      localStorage.setItem('allTasks', JSON.stringify(action.payload));
    },
  },
});

export default todoSlice.reducer;
export const { addTasksAction, updateTaskStatusAction, deleteTaskAction } =
  todoSlice.actions;
