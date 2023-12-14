import React from "react";
import { Emotion } from "../types";

interface Props extends Emotion {
  onClick: (emotion_id: number) => void;
  isSelected: boolean;
}

export default React.memo(function EmotionItem(props: Props) {
  return (
    <div onClick={() => props.onClick(props.emotion_id)} className={["EmotionItem", props.isSelected ? `EmotionItem_on_${props.emotion_id}` : "EmotionItem_off"].join(" ")}>
      <img src={props.emotion_img} alt="emotion" />
      <span>{props.emotion_description}</span>
    </div>
  );
});
