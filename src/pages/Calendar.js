import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import DiaryItem from "../components/DiaryItem";
import Days from "../components/calendar/Days";
import Cell from "../components/calendar/Cell";

export default function Calendar() {
  const diaryList = useContext(DiaryStateContext)
  const [data, setData] = useState([])
  const [curDate, setCurDate] = useState(new Date())

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

  return (
    <div className="Calendar">
      <MyHeader headText={headText} leftChild={<MyButton text={'<'} onClick={decreaseMonth} />} rightChild={<MyButton text={'>'} onClick={increaseMonth} />} />
      <h4>Calendar</h4>
      {/* {diaryList.map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))} */}
      <Days />
      <div>
        <Cell month={curDate} />
      </div>
    </div>
  )
}