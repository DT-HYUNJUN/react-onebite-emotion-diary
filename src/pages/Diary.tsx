import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDiaryState } from "../App";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryType, Emotion } from "../types";

export default function Diary() {
  const diaryList = useDiaryState();
  const [data, setData] = useState<DiaryType>();

  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((it) => it.id === parseInt(id));

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find((it) => it.emotion_id === data.emotion) as Emotion;

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />}
          rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
              <img src={curEmotionData.emotion_img} alt="emotion" />
              <div className="emotion_description">{curEmotionData.emotion_description}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              {data.content.split("\n").map((it) => (
                <p>{it}</p>
              ))}
            </div>
          </section>
        </article>
      </div>
    );
  }
}
