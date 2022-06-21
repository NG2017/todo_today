export default function Todo({ todo, selected, selectThisTodo }) {
  return (
    <div
      className={`todoItem ${selected && "selected"}`}
      onClick={() => selectThisTodo(todo)}
    >
      <input
        type="checkbox"
        value=""
        defaultChecked={todo.completed === 1 ? true : false}
        /* onChange={() => } */
      />
      <div>{todo.title}</div>
    </div>
  );
}
