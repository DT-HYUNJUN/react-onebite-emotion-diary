export default function Days({month}) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  return (
    <div className="Days">
      {days.map((it, idx) => (
        <p className={`Day ${it === 'SUN' ? 'sun' : it === 'SAT' ? 'sat' : ''}`} key={idx}>{it}</p>
      ))}
    </div>
  )
}