import { useNavigate, useSearchParams } from "react-router-dom"

export default function Edit() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  console.log(id)
  return (
    <div>
      <h2>Edit</h2>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({who: 'park'})}>qs</button>
      <button onClick={() => {
        navigate('/')
      }}>home</button>
      <button onClick={() => navigate(-1)}>back</button>
    </div>
  )
}