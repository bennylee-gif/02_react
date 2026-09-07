import React from 'react';

function TodoItem({ todo, index, onToggleStar, onToggleDone, onDelete, onDragStart, onDragOver, onDrop }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className="todo-item"
    >
      {/* 드래그 핸들 아이콘 */}
      <span className="drag-handle">⋮⋮</span>

      {/* 중요 별표 */}
      <span
        onClick={() => onToggleStar(todo.id)}
        className={`star-btn ${todo.isStar ? 'active' : ''}`}
      >
        {todo.isStar ? '★' : '☆'}
      </span>

      {/* 완료 체크박스 */}
      <span
        onClick={() => onToggleDone(todo.id)}
        className="done-btn"
      >
        {todo.isDone ? '☑' : '□'}
      </span>

      {/* 텍스트 */}
      <span className={`todo-text ${todo.isStar ? 'starred' : ''} ${todo.isDone ? 'completed' : ''}`}>
        {todo.text}
      </span>

      {/* 삭제 */}
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
      >
        ✕
      </button>
    </div>
  );
}

export default TodoItem;