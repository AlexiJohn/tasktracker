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
  const username = useSelector((state) => state.auth.username);

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
        console.log(tasks)
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
      axios.post('http://localhost:8000/items', {Name: newTask.Name, Description: newTask.Description, username: username})
      .then((response) => {
        dispatch(setNewTask({...newTask, Name: "", Description:  ""}));
        refreshTask();
      })
      .catch((error) => {
        console.error('Error creating a task:', error);
      });
    }
  };

  const deleteTask = (taskEdit) => {

    if(taskEdit.username !== username){
      alert("WRONG USER")
    } else {
        // Delete a task using the Express API
        axios.delete(`http://localhost:8000/items/${taskEdit.ID}`)
        .then(() => {
          const updatedTasks = tasks.filter((task) => task.id !== taskEdit.ID);
          refreshTask();
        })
        .catch((error) => {
          console.error('Error deleting a task:', error);
        });
    }
    
  };

  const editTask = (task) => {
    // Set the task ID and text for editing
    
    if(task.username !== username){
      alert("WRONG USER")
    } else {
      dispatch(setEditingTaskId(task.ID));
      const filteredTask = tasks.filter(function (el) {
      return el.ID == task.ID;
      })
      dispatch(setEditedTask({ ...editedTask, Name: filteredTask[0].Name, Description:  filteredTask[0].Description}));
    }

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
      <div key={task.ID} className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          {editingTaskId === task.ID ? (
            <>
              <div className="form-group">
                <input 
                  type="text"
                  className="form-control"
                  id="editedTaskName"
                  name="editedTaskName"
                  placeholder={editedTask.Name}
                  value={editedTask.Name}
                  onChange= {(e) => (
                    dispatch(setEditedTask({ ...editedTask, Name: e.target.value }))
                    )} 
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="editedTaskDescription"
                  name="editedTaskDescription"
                  placeholder={editedTask.Description}
                  value={editedTask.Description}
                  onChange={(e) => dispatch(setEditedTask({ ...editedTask, Description: e.target.value }))}
                />
              </div>
              
              <button className="btn btn-primary" onClick={saveEditedTask}>Save</button>
              <button className="btn btn-secondary" onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              
              <p className="card-text">{task.Description}</p>
              <h5 className="card-title">{task.Name}</h5>
              {
                task.username == username ? (
                  <>
                    <button className="btn btn-primary" onClick={() => editTask(task)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteTask(task)}>Delete</button>
                    <div className="card-img-top d-flex justify-content-center align-items-center" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', bottom: '10px', right: '10px', fontSize: '30px', fontWeight: 'bold' }}>
                      {task.username.slice(0, 2).toUpperCase()}
                    </div>
                  </>
                  
                ) : (<>
                    <div className="card-img-top d-flex justify-content-center align-items-center" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', bottom: '10px', right: '10px', fontSize: '30px', fontWeight: 'bold' }}>
                      {task.username.slice(0, 2).toUpperCase()}
                    </div>
                </>)
              }
              
            </>
          )}
        </div>
        
      </div>
))}
    </ul>
  </div> 
  );
}

export default TaskManager;
