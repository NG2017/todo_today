export default function Todo({ todo, dispatch, selectThisTodo }) {
  return (
    <div
      className={`todoItem ${todo.selected && "selected"} ${
        todo.completed && "completed"
      }`}
      onClick={() => selectThisTodo(todo)}
    >
      <input
        type="checkbox"
        value=""
        defaultChecked={todo.completed ? true : false}
        onChange={() => dispatch({ type: "toggle_completed", payload: todo })}
      />
      <div>{todo.title}</div>
    </div>
  );
}
