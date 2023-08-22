import { useParams } from "react-router-dom"

export default function Diary() {
  const {id} = useParams()
  console.log(id)
  return (
    <div>
      <h2>Diary</h2>
      <p>이곳은 일기 상세 페이지 입니다.</p>
    </div>
  )
}