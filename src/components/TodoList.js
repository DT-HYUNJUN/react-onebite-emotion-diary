import TodoItem from "./TodoItem";

export default function TodoList({todos}) {
  return (
    <div className="TodoList">
      <div className="body">
        {todos.map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  )
}