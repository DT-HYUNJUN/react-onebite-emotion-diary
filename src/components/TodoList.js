export default function TodoList({todos, setIsClick}) {
  return (
    <div className="TodoList">
      <div className="body">
        <button onClick={() => setIsClick(false)}>X</button>
        {todos.map((it) => (
          <div key={it.id}>{it.content}</div>
        ))}
      </div>
    </div>
  )
}