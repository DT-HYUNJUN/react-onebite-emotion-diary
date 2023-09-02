import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TodoStateContext } from "../App"
import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"

export default function Todo() {
  const todoList = useContext(TodoStateContext)
  const [data, setData] = useState()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (todoList.length > 0) {
      const targetTodo = todoList.find((it) => parseInt(it.id)  === parseInt(id))
      if (targetTodo) {
        setData(targetTodo)
      } else {
        alert('없는 일정입니다.')
        navigate('/calendar', {replace: true})
      }
    }
  }, [todoList, id])

  if (!data) {
    return (
      <div>로딩중...</div>
    )
  } else {
    console.log(data)
    return (
      <div className="Todo">
        <MyHeader headText={'Todo'} leftChild={<MyButton text={'<'} onClick={() => navigate(-1)} />} rightChild={<MyButton text={'수정하기'} />}/>
        <div>
          <h2>{data.content}</h2>
          <input type="checkbox" checked={data.isDone} />
        </div>
      </div>
    )
  } 
}