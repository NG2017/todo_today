import "./App.css";
import { useState, useReducer, useEffect } from "react";
import Todo from "./components/Todo";

const addNewTodo = (payload) => {
  console.log(Date.now());
  return {
    id: Date.now(),
    title: payload.todoTitle,
    day: payload.todoDay,
    completed: 0,
  };
};

const reducer = (todos, action) => {
  console.log(todos, action.type, action.payload);
  switch (action.type) {
    case "add_new":
      return [...todos, addNewTodo(action.payload)];
      break;
    case "delete":
      return todos.filter((todo) => todo.id !== action.payload.id);
      break;

    default:
      return todos;
  }
};

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDay, setTodoDay] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const [showError, setShowError] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (todoDay !== "" && todoTitle !== "") {
      setShowError(false);
    }
  }, [todoTitle, todoDay]);

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "add_new", payload: { todoTitle, todoDay } });
    setTodoTitle("");
    setTodoDay("");
  };

  const selectDay = (e) => {
    setTodoDay(e.target.value);
  };
  const setMessage = () => {
    setShowError(todoDay === "" || todoTitle === "");
  };
  const selectThisTodo = (todo) => {
    setSelected(todo);
  };
  const deleteSelectedTodo = (todo) => {
    setSelected({});
    dispatch({ type: "delete", payload: selected });
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="formBlock">
          <h3>Add new task</h3>
          <form onSubmit={formSubmit}>
            <input
              type="text"
              value={todoTitle}
              placeholder="Describe task"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <div className="radioGroup">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Today"
                    checked={todoDay === "Today"}
                    onChange={selectDay}
                  />
                  Today
                </label>
              </div>

              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Tomorrow"
                    checked={todoDay === "Tomorrow"}
                    onChange={selectDay}
                  />
                  Tomorrow
                </label>
              </div>
            </div>

            <input
              disabled={todoDay === "" || todoTitle === ""}
              type="submit"
              value="Save"
              onMouseOver={setMessage}
            />
          </form>
          {showError && (
            <div className="error">
              <div className="errorMsg">Write a todo and select a day!</div>
            </div>
          )}
        </div>

        <div className="todoBlock">
          <div className="today">
            <div className="todoListBlock">
              <h3>Tasks for Today</h3>

              <div className="todoList">
                {todos.map((todo) => {
                  if (todo.day === "Today") {
                    return (
                      <Todo
                        key={todo.id}
                        todo={todo}
                        selected={todo.id === selected.id}
                        selectThisTodo={selectThisTodo}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
          </div>
          <div className="modifyBlock">
            <div
              className={`icon ${
                selected.day === "Today" ? "active" : "inactive"
              }`}
            >
              Tomorrow
            </div>
            <div
              className={`icon ${
                selected.day === "Tomorrow" ? "active" : "inactive"
              }`}
            >
              today
            </div>
            <div
              className={`icon ${selected.id ? "active" : "inactive"}`}
              onClick={deleteSelectedTodo}
            >
              delete
            </div>
          </div>
          <div className="tomorrow">
            <div className="todoListBlock">
              <h3>Tasks for Tomorrow</h3>
              <div className="todoList">
                {todos.map((todo) => {
                  if (todo.day === "Tomorrow") {
                    return (
                      <Todo
                        key={todo.id}
                        todo={todo}
                        selected={todo.id === selected.id}
                        selectThisTodo={selectThisTodo}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      selected: {selected.title}
    </div>
  );
};

export default App;
