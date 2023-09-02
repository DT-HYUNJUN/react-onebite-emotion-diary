import TodoItem from "./TodoItem";

export default function TodoList({todos}) {
  return (
    <div className="TodoList">
      <div className="header">
        <h2>오늘의 일정</h2>
      </div>
      <div className="body">
        {todos.map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  )
}