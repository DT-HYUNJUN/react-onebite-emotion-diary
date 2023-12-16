import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryStateContext } from "../App";

import DiaryEditor from "../components/DiaryEditor";
import { DiaryType } from "../types";

export default function Edit() {
  const diaryList = useContext(DiaryStateContext);

  const [originData, setOriginData] = useState<DiaryType>();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList && diaryList.length > 0) {
      const targetDiary = diaryList.find((it) => it.id === parseInt(id!));

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);

  return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>;
}
