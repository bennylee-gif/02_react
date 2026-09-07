import React, { useState } from 'react';
import Header from './components/Header';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import MemoBox from './components/MemoBox';
import './App.css'; // CSS 파일 불러오기

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState('next');

  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dateKey = getDateKey(currentDate);

  const [pagesData, setPagesData] = useState({
    [dateKey]: {
      todos: [
        { id: 1, text: '좌우 화살표(◀ ▶)로 페이지 넘겨보기', isStar: true, isDone: false },
        { id: 2, text: '드래그해서 순서 변경해보기', isStar: false, isDone: false },
      ],
      memo: '',
    },
  });

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
    setDirection(date > currentDate ? 'next' : 'prev');
    setCurrentDate(date);
  };

  const handleToday = () => {
    const today = new Date();
    setDirection(today > currentDate ? 'next' : 'prev');
    setCurrentDate(today);
  };

  const handleCreate = (text) => {
    const newTodo = { id: Date.now(), text, isStar: false, isDone: false };
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