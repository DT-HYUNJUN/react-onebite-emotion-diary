import React, { useReducer, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      return [action.data, ...state]
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it)
      break
    }
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: 'today diary 1',
    date: 1692599823514
  },
  {
    id: 2,
    emotion: 2,
    content: 'today diary 2',
    date: 1692599823515
  },
  {
    id: 3,
    emotion: 3,
    content: 'today diary 3',
    date: 1692599823516
  },
  {
    id: 4,
    emotion: 4,
    content: 'today diary 4',
    date: 1692599823517
  },
  {
    id: 5,
    emotion: 5,
    content: 'today diary 5',
    date: 1692599823518
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0)


  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    dataId.current += 1
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: 'REMOVE', targetId})
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      date: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </Router>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
