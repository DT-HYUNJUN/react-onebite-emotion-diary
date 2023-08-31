import { useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from './MyButton'
import { useNavigate } from "react-router-dom";

export default function NewTodoEditor() {
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  return (
    <div>
      <MyHeader headText={'일정추가'} leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />} />
      <div>
        <input type="date" />
      </div>
      <div>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button onClick={(e) => setContent(e.target.value)}>저장</button>
    </div>
  )
}