import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    newTask: {},
    editingTaskId: null,
    editedTask: {},
    editedTaskText: '',
    editedTaskName: '',
  },
  // MAYBE ADD REDUCERS FOR AXIOS COMMANDS TRY?
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },
    setEditedTask: (state, action) => {
      state.editedTask = action.payload;
    },
    setEditedTaskText: (state, action) => {
      state.editedTaskText = action.payload;
    },
    setEditedTaskName: (state, action) => {
      state.editedTaskText = action.payload;
    },
  },
});

export const {
  setTasks,
  setNewTask,
  setEditingTaskId,
  setEditedTaskText,
  setEditedTaskName,
  setEditedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
