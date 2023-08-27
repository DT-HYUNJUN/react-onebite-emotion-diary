import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfMonth, startOfWeek } from "date-fns"

export default function Cell({month, onDateClick, selectedDate}) {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ''

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd')
      const cloneDay = day
      days.push(
        <div className={`Cell ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''} ${!isSameMonth(day, monthStart)? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : format(month, 'M') !== format(day, 'M') ? 'not-valid' : 'valid' } `} key={day} onClick={() => onDateClick((cloneDay))} >
          <span className={format(month, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>{formattedDate}</span>
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
    </div>
  )
}