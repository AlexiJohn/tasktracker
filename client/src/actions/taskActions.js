import {
    ADD_TASK,
    DELETE_TASK,
    EDIT_TASK,
    SAVE_EDITED_TASK,
    CANCEL_EDIT,
    SET_NEW_TASK_TEXT,
    SET_EDITED_TASK_TEXT,
  } from './actionTypes';
  
  export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
  });
  
  export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
  });
  
  export const editTask = (taskId) => ({
    type: EDIT_TASK,
    payload: taskId,
  });
  
  export const saveEditedTask = (taskId, editedText) => ({
    type: SAVE_EDITED_TASK,
    payload: { taskId, editedText },
  });
  
  export const cancelEdit = () => ({
    type: CANCEL_EDIT,
  });
  
  export const setNewTaskText = (text) => ({
    type: SET_NEW_TASK_TEXT,
    payload: text,
  });
  
  export const setEditedTaskText = (text) => ({
    type: SET_EDITED_TASK_TEXT,
    payload: text,
  });
  