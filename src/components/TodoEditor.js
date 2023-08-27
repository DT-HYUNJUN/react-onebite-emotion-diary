import { useState } from "react"

export default function TodoEditor({selectedDate}) {
  const [data, setData] = useState([])

  const seletDate = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}에 일정 추가`

  const [todo, setTodo] = useState({
    content: '',
    isDone: false,
  })

  const handleChange = (e) => setTodo(e.target.value)

  const handleSubmit = () => setData([todo, ...data])
  return (
    <div>
      <h2>Todo Editor</h2>
      <input placeholder={seletDate} value={todo.content} onChange={handleChange} />
      <button onClick={handleSubmit}>+</button>
    </div>
  )
}