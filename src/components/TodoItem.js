import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TodoDispatchContext } from "../App"

export default function TodoItem({id, content, isDone, date}) {
  const [newIsDone, setNewIsDone] = useState(isDone)
  const {onEditTodo} = useContext(TodoDispatchContext)

  const handleIsDone = () => {
    setNewIsDone((prev) => !prev)
    onEditTodo(id, content, newIsDone, date)
  }

  const navigate = useNavigate()
  return (
    <div className="TodoItem">
      <p className={newIsDone ? 'todo_content' : ''} onClick={() => navigate(`/todo/${id}`)}>{content}</p>
      <input type="checkbox" checked={newIsDone} onChange={handleIsDone} />
      {`일정 ${newIsDone}`}
    </div>
  )
}