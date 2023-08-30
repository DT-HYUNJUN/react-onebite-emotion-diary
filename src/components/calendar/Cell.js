import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns"
import { useContext, useEffect, useRef, useState } from "react"
import { TodoStateContext } from "../../App"
import TodoList from '../TodoList'
import { getStringDate } from "../../util/date"

export default function Cell({month, onDateClick, selectedDate, todayTodos, getTodayTodos}) {
  const todoList = useContext(TodoStateContext)

  const [todos, setTodos] = useState([])
  const [isClick, setIsClick] = useState(false)

  const modalRef = useRef(null);

  useEffect(() => {
    const closeModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsClick(false);
      }
    };

    document.addEventListener("mousedown", closeModal);

    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [setIsClick]);


  const today = new Date()

  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ''

  const handleClick = (cloneDay, currentDayTodos) => () => {
    onDateClick(cloneDay)
    if (currentDayTodos.length > 0) {
      setTodos(currentDayTodos)
      setIsClick(true)
    }
  }

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd')
      const cloneDay = day
      const currentDayTodos = todoList.filter(it => it.date === `${getStringDate(cloneDay)}`);
      days.push(
        <div className={`Cell ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''} ${!isSameMonth(day, monthStart)? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : format(month, 'M') !== format(day, 'M') ? 'not-valid' : 'valid' } ${isSameDay(day, today) ? 'today' : ''}  `} key={day} onClick={handleClick(cloneDay, currentDayTodos)} >
          <span className={format(month, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>{formattedDate}</span>
          {currentDayTodos.slice(0, 3).map((it) => (
            <div key={it.id}>
              {it.content}
            </div>
          ))}
          {(currentDayTodos.length > 3) && <span>...</span>}
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div className="week" key={day}>{days}</div>
    )
    days = []
  }
  return (
    <div className="calendar_body">
      {rows}
      {isClick && (
        <div ref={modalRef} className="modal_wrapper">
          <TodoList todos={todos} setIsClick={setIsClick} />
        </div>
      )}
    </div>
  )
}