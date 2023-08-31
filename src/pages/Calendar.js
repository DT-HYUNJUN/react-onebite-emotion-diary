import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext, TodoStateContext } from "../App";
import Days from "../components/calendar/Days";
import Cell from "../components/calendar/Cell";
import { useNavigate } from "react-router-dom";
import TodoEditor from "../components/TodoEditor";
import { getStringDate } from "../util/date";

export default function Calendar() {
  const diaryList = useContext(DiaryStateContext)
  const todoList = useContext(TodoStateContext)
  const [data, setData] = useState([])

  const [curDate, setCurDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const navigate = useNavigate()

  // 월별로 diary 변경
  useEffect(() => {
    if (diaryList.length > 1) {
      const firstday = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
      ).getTime()
      const lastday = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0, 23, 59, 59
      ).getTime()
      setData(diaryList.filter((it) => it.date >= firstday && it.date <= lastday))
    }
  }, [curDate, diaryList])
  
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
  }

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
  }

  const goToDiary = () => navigate('/')

  const onDateClick = (day) => {
    setSelectedDate(day)
  }

  return (
    <div className="Calendar">
      <MyHeader headText={headText} leftChild={<MyButton text={'<'} onClick={decreaseMonth} />} rightChild={<MyButton text={'>'} onClick={increaseMonth} />} />
      <div className="top">
        <MyButton text={'일기'} onClick={goToDiary} />
      </div>
      <Days />
      <Cell month={curDate} onDateClick={onDateClick} selectedDate={selectedDate} />
      <TodoEditor selectedDate={selectedDate} />
    </div>
  )
}