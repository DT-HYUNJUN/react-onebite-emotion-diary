import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

import { DiaryType } from "./types";

type Action =
  | {
      type: "INIT";
      data: DiaryType[];
    }
  | {
      type: "CREATE";
      data: DiaryType;
    }
  | {
      type: "REMOVE";
      targetId: number;
    }
  | {
      type: "EDIT";
      data: DiaryType;
    };

const reducer = (state: DiaryType[], action: Action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext<DiaryType[] | null>(null);
export const DiaryDispatchContext = React.createContext<{
  onCreate: (date: number, content: string, emotion: number) => void;
  onRemove: (targetId: number) => void;
  onEdit: (targetId: number, date: number, content: string, emotion: number) => void;
} | null>(null);

export const useDiaryDispatch = () => {
  const dispatch = useContext(DiaryDispatchContext);
  if (!dispatch) throw new Error("dispatch error");
  return dispatch;
};

export const useDiaryState = () => {
  const state = useContext(DiaryStateContext);
  if (!state) throw new Error("state error");
  return state;
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
      const diaryList = JSON.parse(localData).sort((a: DiaryType, b: DiaryType) => b.id - a.id);

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  // CREATE
  const onCreate = (date: number, content: string, emotion: number) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId: number, date: number, content: string, emotion: number) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
