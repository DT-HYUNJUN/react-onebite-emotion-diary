import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStateContext } from "../App"
import DiaryEditor from "../components/DiaryEditor"

export default function Edit() {
  const diaryList = useContext(DiaryStateContext)

  const [originData, setOriginData] = useState()

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      console.log(targetDiary)

      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        navigate('/', {replace: true})
      }
    }

  }, [diaryList, id])
  
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}