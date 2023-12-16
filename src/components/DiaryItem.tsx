import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import { DiaryType } from "../types";

export default React.memo(function DiaryItem(props: DiaryType) {
  const strDate = new Date(props.date).toLocaleDateString();
  const navigate = useNavigate();

  const goDetail = () => navigate(`/diary/${props.id}`);

  const goEdit = () => navigate(`/edit/${props.id}`);

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${props.emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${props.emotion}.png`} alt="" />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{props.content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
});
