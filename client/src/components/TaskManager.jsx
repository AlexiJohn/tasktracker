import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTasks,
  setNewTask,
  setEditingTaskId,
  setEditedTaskText,
  setEditedTask,
} from '../reducers/taskSlice';

function TaskManager() {

  const dispatch = useDispatch();
  const { tasks, newTask, editingTaskId, editedTaskText, editedTask } = useSelector((state) => state.tasks);

  useEffect(() => {

    // // Fetch tasks from the Express API when the component mounts
    axios.get('http://localhost:8000/items')
      .then((response) => {
        dispatch(setTasks(response.data));
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const refreshTask = () => {
    // // Fetch tasks from the Express API when the component mounts
    axios.get('http://localhost:8000/items')
      .then((response) => {
        dispatch(setTasks(response.data));
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }

  const addTask = () => {

    if (newTask.Name == "" || newTask.Description == ""){
      alert("Please input valid data");
    } else {
      // Create a new task using the Express API
      axios.post('http://localhost:8000/items', newTask)
      .then((response) => {
        dispatch(setNewTask({...newTask, Name: "", Description:  ""}));
        refreshTask();
      })
      .catch((error) => {
        console.error('Error creating a task:', error);
      });
    }
  };

  const deleteTask = (taskId) => {
    // Delete a task using the Express API
    axios.delete(`http://localhost:8000/items/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        refreshTask();
      })
      .catch((error) => {
        console.error('Error deleting a task:', error);
      });
  };

  const editTask = (taskId, editingTask) => {
    // Set the task ID and text for editing
    
    dispatch(setEditingTaskId(taskId));
    const filteredTask = tasks.filter(function (el) {
      return el.ID == taskId;
    })
    dispatch(setEditedTask({ ...editedTask, Name: filteredTask[0].Name, Description:  filteredTask[0].Description}));

  };

  const saveEditedTask = () => {
    // Update a task using the Express API
    axios.put(`http://localhost:8000/items/${editingTaskId}`, editedTask)
      .then(() => {
        // Update the tasks with the edited text
        const updatedTasks = tasks.map((task) =>
          task.ID === editingTaskId ? { ...task, task: editedTaskText } : task
        );
        refreshTask();
        // Clear the editing state
        dispatch(setEditingTaskId(null));
      })
      .catch((error) => {
        console.error('Error updating a task:', error);
      });
  };

  const cancelEditing = () => {
    // Cancel the editing process and clear the editing state
    dispatch(setEditingTaskId(null));
    dispatch(setEditedTaskText(''));
  };

  return (
    <div>
    <h1>Task Manager</h1>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        value={newTask.Name}
        onChange={(e) => dispatch(setNewTask({ ...newTask, Name: e.target.value }))}
      />
    </div>
    <div className="mb-3">
      <textarea
        className="form-control"
        placeholder="Description"
        value={newTask.Description}
        onChange={(e) => dispatch(setNewTask({ ...newTask, Description: e.target.value }))}
      />
    </div>
    <button className="btn btn-primary" onClick={addTask}>
      Add Task
    </button>
    <ul>
    {tasks.map((task) => (
          <li key={task.ID}>
            {editingTaskId === task.ID ? (
              <>
                <div>
                    <input 
                      type="text"
                      id="editedTaskName"
                      name="editedTaskName"
                      placeholder={editedTask.Name}
                      value={editedTask.Name}
                      onChange= {(e) => (
                        dispatch(setEditedTask({ ...editedTask, Name: e.target.value }))
                        )} 
                    />
                </div>
                <div>
                  <input
                    type="text"
                    id="editedTaskDescription"
                    name="editedTaskDescription"
                    placeholder={editedTask.Description}
                    value={editedTask.Description}
                    onChange={(e) => dispatch(setEditedTask({ ...editedTask, Description: e.target.value }))}
                  />
                </div>
                
                
                <button onClick={saveEditedTask}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <div>
                  <strong>Name:</strong> {task.Name}
                </div>
                <div>
                  <strong>Description:</strong> {task.Description}
                </div>
                <button onClick={() => editTask(task.ID, task.Name)}>Edit</button>
                <button onClick={() => deleteTask(task.ID)}>Delete</button>
              </>
            )}
          </li>
        ))}
    </ul>
  </div> 
  );
}

export default TaskManager;
