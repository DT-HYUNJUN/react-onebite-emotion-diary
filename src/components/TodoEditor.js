import { useContext, useEffect, useRef, useState } from "react"
import { TodoDispatchContext } from "../App"
import { getStringDate } from "../util/date"
import { useNavigate } from "react-router-dom"

export default function TodoEditor({selectedDate}) {
  const [content, setContent] = useState('')
  const [date, setDate] = useState(getStringDate(selectedDate))
  const [isContent, setIsContent] = useState(false)

  const navigate = useNavigate()

  const contentRef = useRef()

  const {onCreateTodo, onEditTodo, onRemoveTodo} = useContext(TodoDispatchContext)

  useEffect(() => {
    setDate(getStringDate(selectedDate))
  }, [selectedDate])

  useEffect(() => {
    content.length > 0 ? setIsContent(true) : setIsContent(false)
  }, [content])

  const inputPlaceholder = `${date.slice(5,7)}월 ${date.slice(8,10)}에 일정 추가`

  const handleChange = (e) => setContent(e.target.value)

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus()
      return
    }
    onCreateTodo(content, date)
    setContent('')
  }

  return (
    <div className="TodoEditor">
      <h2>Todo Editor</h2>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <input ref={contentRef} placeholder={inputPlaceholder} value={content} onChange={handleChange} />
        {isContent ? <button onClick={handleSubmit}>V</button> : <button onClick={() => navigate('/newTodo')}>+</button>}
      </div>
    </div>
  )
}