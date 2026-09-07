import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleStar, onToggleDone, onDelete, onReorder }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    onReorder(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  return (
    <div className="todo-list-container">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggleStar={onToggleStar}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}

export default TodoList;