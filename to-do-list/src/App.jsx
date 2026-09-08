import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import MemoBox from './components/MemoBox';
import './App.css';

// useState 초기화 시 참조하기 위해 getDateKey를 컴포넌트 바깥으로 이동
const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState('next');

  const dateKey = getDateKey(currentDate);

  // 1. 앱 시작 시 localStorage에 저장된 데이터 불러오기
  const [pagesData, setPagesData] = useState(() => {
    const saved = localStorage.getItem('pagesData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('저장된 데이터를 불러오는 데 실패했습니다.', error);
      }
    }
    // 저장된 데이터가 없을 때의 초기값
    return {
      [getDateKey(new Date())]: {
        todos: [
          { id: 1, text: '좌우 화살표(◀ ▶)로 페이지 넘겨보기', isStar: true, isDone: false },
          { id: 2, text: '드래그해서 순서 변경해보기', isStar: false, isDone: false },
        ],
        memo: '',
      },
    };
  });

  // 2. pagesData가 변경될 때마다 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem('pagesData', JSON.stringify(pagesData));
  }, [pagesData]);

  const currentPage = pagesData[dateKey] || { todos: [], memo: '' };
  const todos = currentPage.todos;
  const memo = currentPage.memo;

  const updateCurrentPage = (newTodos, newMemo) => {
    setPagesData((prev) => ({
      ...prev,
      [dateKey]: {
        todos: newTodos !== undefined ? newTodos : (prev[dateKey]?.todos || []),
        memo: newMemo !== undefined ? newMemo : (prev[dateKey]?.memo || ''),
      },
    }));
  };

  const handlePrevDay = () => {
    setDirection('prev');
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDay = () => {
    setDirection('next');
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const handleSelectDate = (date) => {
    const targetKey = getDateKey(date);
    const currentKey = getDateKey(currentDate);
    setDirection(targetKey >= currentKey ? 'next' : 'prev');
    setCurrentDate(date);
  };

  const handleToday = () => {
    const today = new Date();
    const todayKey = getDateKey(today);
    const currentKey = getDateKey(currentDate);
    setDirection(todayKey >= currentKey ? 'next' : 'prev');
    setCurrentDate(today);
  };

  const handleCreate = (text) => {
    const newTodo = { id: crypto.randomUUID(), text, isStar: false, isDone: false };
    updateCurrentPage([...todos, newTodo], memo);
  };

  const handleToggleStar = (id) => {
    const newTodos = todos.map((t) => (t.id === id ? { ...t, isStar: !t.isStar } : t));
    updateCurrentPage(newTodos, memo);
  };

  const handleToggleDone = (id) => {
    const newTodos = todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t));
    updateCurrentPage(newTodos, memo);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    updateCurrentPage(newTodos, memo);
  };

  const handleReorder = (fromIndex, toIndex) => {
    const updated = Array.from(todos);
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    updateCurrentPage(updated, memo);
  };

  const handleChangeMemo = (newMemo) => updateCurrentPage(todos, newMemo);

  return (
    <div className="app-container">
      <div
        key={dateKey}
        className={`diary-paper ${direction === 'next' ? 'page-animation-next' : 'page-animation-prev'}`}
      >
        <Header
          currentDate={currentDate}
          onSelectDate={handleSelectDate}
          onToday={handleToday}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          todos={todos}
        />
        <CreateTodo onCreate={handleCreate} />
        <TodoList
          todos={todos}
          onToggleStar={handleToggleStar}
          onToggleDone={handleToggleDone}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />
        <MemoBox memo={memo} onChangeMemo={handleChangeMemo} />
      </div>
    </div>
  );
}

export default App;