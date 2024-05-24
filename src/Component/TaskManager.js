import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TaskManager = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTasks = [...tasks, inputValue];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      setInputValue('');
    }
  };
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
   
  };



  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="col-md-6">
        <form className="p-4 border rounded shadow" onSubmit={handleAddTask}>
          <h1 className="text-center mb-4">Task List</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter something..."
            />
          </div>
          <div className="text-center"> {/* Centering the button */}
            <button type="submit" className="btn btn-dark">Add</button>
          </div>
        </form>
        {
          tasks.length > 0 ? (
            <table className="table table-hover my-5">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Task</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{task}</td>
                <td>
                  <button className="btn btn-outline-dark" onClick={() => handleDeleteTask(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
          ) : <div></div>
        }
               </div>
    </div>
  );
};

export default TaskManager;
