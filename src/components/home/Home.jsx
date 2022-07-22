import React, { useState, useEffect } from "react";
import "./home.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const storageJson = JSON.parse(localStorage.getItem("todoList")) ?? [];

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(storageJson);
  const [index, setIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Cannot be left blank");
    } else {
      if (index != null) {
        let items = [...todos];
        const findItem = items.find((item) => item.id === index);
        findItem.title = input;
        findItem.completed = false;
        setTodos(items);
        setIndex(null);
        setInput("");
      } else {
        let newTodo = {
          id: new Date().getTime(),
          title: input,
          completed: false,
          check: false,
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
    // todos.map((todo) => {
    //   if (todo.id === id) {
    //     setInput(todo.title);
    //   }
    // });
    setIndex(id);
    setInput(title);
  };

  const [check, setCheck] = useState(false);

  const handleCheck = (todo) => {
    const newTodo = todos.map((item) => {
      if (item.id === todo.id) {
        item.check = !item.check;
      }
      return item;
    });

    setTodos(newTodo);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);
  ///////////////////////////////////////////////////////////////////////

  const [count, setCount] = useState(0);

  const renderCheckCount = () => {
    // let count = 0;
    // todos.forEach((element) => {
    //   if (element.check) {
    //     count++;
    //   }
    // });
    if (count === 0) return "";
    return `Delete ${count} elements`;
  };

  const handleDeleteTask = () => {
    alert("Ban chac chan muon xoa chua?");
    const newList = todos.filter((todo) => {
      return todo.check !== true;
    });
    setTodos(newList);
  };

  return (
    <div className="home-container">
      <h2>Welcome to {location?.state?.email}</h2>

      <div className="todo-container">
        <h3 className="todo-title">Todo App</h3>

        <p className="delete-task" onClick={() => handleDeleteTask()}>
          {renderCheckCount()}
        </p>

        <p>{todos.length === 0 ? "" : `You have an ${todos.length} tasks`}</p>

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

        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                onChange={(e) => {
                  handleCheck(todo);
                  if (e.target.checked === true) {
                    setCount(count + 1);
                  } else if (count > 0 && e.target.checked === false) {
                    setCount(count - 1);
                  }
                }}
                type="checkbox"
                name=""
                id=""
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

          {check && <button>djfksdlf</button>}
        </div>
      </div>
    </div>
  );
}
