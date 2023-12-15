import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";
import { DiaryType } from "../types";

interface option {
  value: string;
  name: string;
}

interface ControlMenuProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  optionList: option[];
}

const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = React.memo((props: ControlMenuProps) => {
  return (
    <select className="ControlMenu" value={props.value} onChange={(e) => props.onChange(e.target.value)}>
      {props.optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

interface Props {
  diaryList: DiaryType[];
}

export default function DiaryList(props: Props) {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const filterCallBack = (item: DiaryType) => {
    if (filter === "good") {
      return item.emotion <= 3;
    } else {
      return item.emotion > 3;
    }
  };

  const getProcessedDiaryList = () => {
    const compare = (a: DiaryType, b: DiaryType) => {
      if (sortType === "latest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };
    const copyList: DiaryType[] = JSON.parse(JSON.stringify(props.diaryList));

    const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton type={"positive"} text={"새 읽기 쓰기"} onClick={() => navigate("/new")} />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};
