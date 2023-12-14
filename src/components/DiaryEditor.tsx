import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDiaryDispatch } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { useCallback } from "react";
import { DiaryType } from "../types";

interface Props {
  isEdit: boolean;
  originData: DiaryType;
}

export default function DiaryEditor(props: Props) {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const dispatch = useDiaryDispatch();

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const handleClickEmote = useCallback((emotion: number) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (contentRef.current && content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(props.isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      if (!props.isEdit) {
        dispatch.onCreate(date, content, emotion);
      } else {
        dispatch.onEdit(props.originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch.onRemove(props.originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (props.isEdit) {
      setDate(getStringDate(new Date(props.originData.date)));
      setEmotion(props.originData.emotion);
      setContent(props.originData.content);
    }
  }, [props.isEdit, props.originData]);

  console.log(date);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={props.isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={props.isEdit && <MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className="input_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion} />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="오늘은 어땠나요?" />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}
