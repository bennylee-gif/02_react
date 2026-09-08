import React from 'react';

function MemoBox({ memo, onChangeMemo }) {
  return (
    <div className="memo-box-container">
      <div className="memo-box-title">
        💬 오늘의 메모 & 명언
      </div>
      <textarea
        value={memo || ''}
        onChange={(e) => onChangeMemo(e.target.value)}
        placeholder="오늘 기억할 명언이나 자유로운 메모를 적어보세요."
        rows={3}
        maxLength={300}
        className="memo-box-textarea"
      />
    </div>
  );
}

export default MemoBox;