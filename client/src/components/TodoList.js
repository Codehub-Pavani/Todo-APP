import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; 

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);

        const longestTask = Math.max(...response.data.map(task => task.name.length));
        adjustCardSize(response.data.length, longestTask);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const adjustCardSize = (taskCount, longestTaskLength) => {
    const baseWidth = 400;
    const maxWidth = 600; 
    const increment = 3; 
    const lengthFactor = 10;
    const newWidth = baseWidth + increment * taskCount + lengthFactor * longestTaskLength;
    
   const baseHeight = 300; 
   const heightIncrement = 3; 
   const newHeight = baseHeight + heightIncrement * taskCount;

    document.documentElement.style.setProperty('--card-width', `${Math.min(newWidth, maxWidth)}px`);
    document.documentElement.style.setProperty('--card-height', `${newHeight}px`);
    document.documentElement.style.setProperty('--task-width', `${Math.min(newWidth * 0.35, 100)}%`);

  };

  const addTask = () => {
    if (newTask.trim()) {
      axios.post('/api/tasks', { name: newTask })
        .then(response => {
          const updatedTasks = [...tasks, response.data];
          setTasks(updatedTasks);
          setNewTask('');
          const longestTask = Math.max(...updatedTasks.map(task => task.name.length));
          adjustCardSize(updatedTasks.length, longestTask);
        })
        .catch(error => {
          console.error('There was an error adding the task!', error);
        });
    }
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task._id !== id);
        setTasks(updatedTasks);
        const longestTask = updatedTasks.length > 0 ? Math.max(...updatedTasks.map(task => task.name.length)) : 0;
        adjustCardSize(updatedTasks.length, longestTask);
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  };

  const editTask = (id, name) => {
    setEditingTaskId(id);
    setEditingTaskName(name);
  };

  const updateTask = (id) => {
    if (editingTaskName.trim()) {
      axios.put(`/api/tasks/${id}`, { name: editingTaskName })
        .then(response => {
          const updatedTasks = tasks.map(task => 
            task._id === id ? response.data : task
          );
          setTasks(updatedTasks);
          setEditingTaskId(null);
          setEditingTaskName('');

          const longestTask = Math.max(...updatedTasks.map(task => task.name.length));
          adjustCardSize(updatedTasks.length, longestTask);
        })
        .catch(error => {
          console.error('There was an error updating the task!', error);
        });
    }
  };

  return (
    <div className="todo-container">
    <div className="todo-card">
      <h1 className="todo-title">Get It Done!!</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="New task" 
          className="task-input"
        />
        <button onClick={addTask} className="task-add-btn">Add Task</button>
      </div>

      <div className="task-container">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            {editingTaskId === task._id ? (
              <div className="task-edit-container">
                <input 
                  type="text" 
                  value={editingTaskName} 
                  onChange={(e) => setEditingTaskName(e.target.value)} 
                  className="task-edit-input"
                />
                <button onClick={() => updateTask(task._id)} className="task-save-btn">
                  <i className="fas fa-save" style={{color:'blue' ,fontSize: '24px'}}></i>
                </button>
              </div>
            ) : (
              <div className="task-view-container">
                <span>{task.name}</span>
                <div>
                  <button onClick={() => editTask(task._id, task.name)} className="task-edit-btn">
                  <i className="fas fa-edit" style={{ color: 'orange' }} ></i>
                  </button>
                  <button onClick={() => deleteTask(task._id)} className="task-delete-btn">
                  <i className="fas fa-trash" style={{color: 'brown'}}></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TodoList;
