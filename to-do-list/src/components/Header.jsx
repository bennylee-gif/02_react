import React from 'react';
import './Header.css';

function Header({ currentDate, onSelectDate, onToday, onPrevDay, onNextDay }) {
  const formatDateForInput = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const dayOfWeek = currentDate.toLocaleDateString('ko-KR', { weekday: 'short' });

  return (
    <div className="header-container">
      {/* 1. 상단: 좌측 날짜 선택창 & 우측 오늘 버튼 */}
      <div className="header-top">
        <div className="date-picker-group">
          <input
            type="date"
            value={formatDateForInput(currentDate)}
            onChange={(e) => e.target.value && onSelectDate(new Date(e.target.value + 'T00:00:00'))}
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
    </div>
  );
}

export default Header;