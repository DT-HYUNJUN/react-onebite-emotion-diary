import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns"

export default function Cell({month}) {
  const today = new Date()
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
        <div className={`Cell ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''} ${!isSameMonth(day, monthStart)? 'disabled' : isSameDay(day, today) ? 'selected' : format(month, 'M') !== format(day, 'M') ? 'not-valid' : 'valid' } `} key={day}>
          <span>{formattedDate}</span>
          <div>
          </div>
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