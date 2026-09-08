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

// 코드 불안정성 및 잠재적 버그
// 날짜 비교 시 시간(HH:mm:ss) 오차: handleToday 등에서 today > currentDate로 날짜를 비교할 때, today에는 현재 시·분·초 정보가 들어있는 반면 currentDate는 특정 시점으로 세팅되어 있습니다. 이로 인해 같은 날짜임에도 애니메이션 방향(next/prev)이 틀어질 수 있으므로, 비교 전 날짜의 시간을 00:00:00으로 통일해 주는 것이 안전합니다.
// 데이터 휘발성: 현재 pagesData가 메모리(useState)에만 존재하여 브라우저를 새로고침하면 모든 투두와 메모가 초기화됩니다.
// ID 중복 가능성: id: Date.now()는 버튼을 빠르게 연달아 클릭할 경우 동일한 타임스탬프가 생성되어 React key 중복 에러를 일으킬 수 있습니다. crypto.randomUUID() 방식을 권장합니다.

// 보안 및 데이터 검증
// 입력값 제한 미비: input 및 textarea에 글자 수 제한이 없어, 매우 긴 텍스트가 입력될 경우 다이어리 종이 레이아웃(box-shadow 영역) 밖으로 텍스트가 삐져나가거나 화면이 깨질 수 있습니다. maxLength 속성을 지정하는 것이 좋습니다.

// 추천 기능 (Feature Roadmap)
// localStorage 데이터 저장: useEffect를 활용하여 pagesData가 변경될 때마다 브라우저 로컬 저장소에 자동으로 저장 및 로드되도록 구현하면 실제 다이어리처럼 지속 사용할 수 있습니다.
// 달성률(Progress Bar) 표시: 해당 날짜의 전체 투두 대비 완료된 투두 비율을 상단 헤더나 하단에 진행 바 형태로 보여주면 사용자 경험이 좋아집니다.
// 모바일 터치 드래그 지원: 현재 사용 중인 HTML5 Drag & Drop API는 모바일 기기(스마트폰/태블릿) 환경에서는 동작하지 않습니다. 모바일 대응이 필요하다면 dnd-kit 또는 @hello-pangea/dnd 라이브러리를 도입하는 것을 추천합니다.