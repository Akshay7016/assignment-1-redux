import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addTodo } from './redux/TodoSlice'
import Board from './components/Board/Board';

import './App.css';

const App = () => {
  // dispatch is used to dispatch the data to reducer function
  const dispatch = useDispatch();

  // useSelector is used to fetch data from store
  const todos = useSelector((state) => state.todo.todoList)

  const [newTask, setNewTask] = useState("");

  const changeHandler = (event) => {
    setNewTask(event.target.value);
  }

  // Function to dispatch data for adding card in first board
  const addCard = () => {
    newTask ? dispatch(addTodo(newTask)) : toast.error("Please enter task", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setNewTask("");
  }

  return (
    <>
      <div className='app'>
        <div className='app_navbar bg-info'>
          <h2>Kanban</h2>
        </div>

        <div className="app_title">
          <input type="text" value={newTask} onChange={changeHandler} placeholder="Enter New Task"></input>
          <button type="submit" className="btn btn-primary ml-2" onClick={addCard}>Add Task</button>
        </div>

        <div className='app_boards_container'>
          <div className='app_boards'>
            {
              todos.map((item) => (
                <Board key={item.id}
                  board={item}
                />
              ))
            }
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
