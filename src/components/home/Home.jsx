import React, { useState, useEffect } from "react";
import "./home.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const storageJson = JSON.parse(localStorage.getItem("todoList")) ?? [];

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(storageJson);
  const [isEdit, setIsEdit] = useState(null);
  const [selected, setSelected] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Cannot be left blank");
    } else {
      if (isEdit != null) {
        let items = [...todos];
        const findItem = items.find((item) => item.id === isEdit);
        findItem.title = input;
        // findItem.completed = false;
        setTodos(items);
        setIsEdit(null);
        setInput("");
      } else {
        let newTodo = {
          id: new Date().getTime(),
          title: input,
          completed: false,
        };
        setTodos([...todos, newTodo]);
        setInput("");
      }
    }
  };

  const handleDelete = (id) => {
    let deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = (id, title) => {
    setIsEdit(id);
    setInput(title);
  };

  const handleSelect = (todo, target) => {
    if (target.checked === true) {
      setSelected(prev=> prev.concat(todo.id))
    } else if (target.checked === false) {
      setSelected(prev=>prev.filter(x=>x!== todo.id))
    }
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);
  ///////////////////////////////////////////////////////////////////////


  const handleDeleteTask = () => {
    alert("Ban chac chan muon xoa chua?");
    const newList = todos.filter((todo) => {
      return !selected.includes(todo.id);
    });
    setTodos(newList);
    setSelected([])
  };

  return (
    <div className="home-container">
      <h2>Welcome to {location?.state?.email}</h2>

      <div className="todo-container">
        <h3 className="todo-title">Todo App</h3>

        {selected.length > 0 && <button className="delete-task" onClick={() => handleDeleteTask()}>
          {`Delete ${selected.length} elements`}
        </button>}

        {!!todos.length && <p>{`You have ${todos.length} tasks`}</p>}

        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add todo ..."
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="todo-submit">
            Submit
          </button>
        </form>

        <div className={todos.length ? "todo-list" : ''}>
          {!!todos.length && <div className="check-all-container">
            <input
                className="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected(todos.map(x=>x.id))
                  } else {
                    setSelected([])
                  }
                }}
                type="checkbox"
            />
            <span>Check all</span>
          </div>}
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                checked={selected.includes(todo.id)}
                className="checkbox"
                onChange={(e) => {
                  handleSelect(todo, e.target);
                }}
                type="checkbox"
                name=""
                id={`checkbox-${todo.id}`}
              />
              <div
                className={`todo-value ${todo.completed ? "completed" : ""}`}
              >
                {todo.title}
              </div>
              <div
                className="todo-edit"
                onClick={() => handleEdit(todo.id, todo.title)}
              >
                Edit
              </div>
              <div
                className="todo-delete"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </div>
              <div
                className="todo-complete"
                onClick={() => handleComplete(todo)}
              >
                Complete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
