import { useNavigate } from "react-router-dom"

export default function TodoItem({id, content, date}) {
  const navigate = useNavigate()
  return (
    <div>
      <h2 onClick={() => navigate(`/todo/${id}`)}>{content}</h2>
    </div>
  )
}