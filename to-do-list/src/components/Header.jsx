import React from 'react';

function Header({ currentDate, onSelectDate, onToday, onPrevDay, onNextDay, todos = [] }) {
  const formatDateForInput = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const dayOfWeek = currentDate.toLocaleDateString('ko-KR', { weekday: 'short' });

  const handleDateChange = (e) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-').map(Number);
    onSelectDate(new Date(year, month - 1, day));
  };

  // 달성률 계산 로직
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.isDone).length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="header-container">
      {/* 1. 상단: 좌측 날짜 선택창 & 우측 오늘 버튼 */}
      <div className="header-top">
        <div className="date-picker-group">
          <input
            type="date"
            value={formatDateForInput(currentDate)}
            onChange={handleDateChange}
            className="date-input"
          />
          <span className="day-of-week">({dayOfWeek})</span>
        </div>

        <button onClick={onToday} className="btn-today">
          오늘
        </button>
      </div>

      {/* 2. 중앙: 책장 이전/다음 넘김 버튼 & 타이틀 */}
      <div className="header-main">
        <button
          onClick={onPrevDay}
          className="btn-nav"
          title="어제 페이지로 넘기기"
        >
          ◀
        </button>

        <h2 className="header-title">TO DO LIST</h2>

        <button
          onClick={onNextDay}
          className="btn-nav"
          title="내일 페이지로 넘기기"
        >
          ▶
        </button>
      </div>

      {/* 3. 하단: 달성률 진행 바 (Progress Bar) */}
      <div className="progress-container">
        <div className="progress-info">
          <span>오늘의 달성률</span>
          <span>{percentage}% ({completedCount}/{totalCount})</span>
        </div>
        <div className="progress-bar-background">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;