export interface DiaryType {
  id: number;
  content: string;
  emotion: number;
  date: number;
}

export interface Emotion {
  emotion_id: number;
  emotion_img: string;
  emotion_description: string;
}
