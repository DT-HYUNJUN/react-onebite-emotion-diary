import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Calendar from './pages/Calendar';

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      newState = [action.data, ...state]
      break
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
  
  localStorage.setItem('diary', JSON.stringify(newState))
  return newState
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, [])

  const [todo, dispatchTodo] = useReducer(reducer, [])

  const dataId = useRef(0)

  const todoId = useRef(0)

  useEffect(() => {
    const localData = localStorage.getItem('diary')
    const localDataTodo = localStorage.getItem('todo')

    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id))

      if (diaryList.length >= 1 ) {
        dataId.current = parseInt(diaryList[0].id) + 1
        dispatch({type: 'INIT', data: diaryList})
      }
    }

    if (localDataTodo) {
      const todoList = JSON.parse(localDataTodo).sort((a, b) => parseInt(b.id) - parseInt(a.id))

      if (todoList.length >= 1) {
        todoId.current = parseInt(todoList[0].id) + 1
        dispatch({type: 'INIT', data: todoList})
      }
    }
  }, [])

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
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  // Todo
  const onCreateTodo = (content) => {
    dispatchTodo({
      type: 'CREATE',
      data: {
        id: todoId.current,
        content,
        isDone: false,
      }
    })
    todoId.current += 1
  }

  const onRemoveTodo = (targetId) => {
    dispatchTodo({type: 'REMOVE', targetId})
  }

  const onEditTodo = (targetId, content) => {
    dispatchTodo({
      type: 'EDIT',
      data: {
        id: targetId,
        content: content
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
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </Router>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
