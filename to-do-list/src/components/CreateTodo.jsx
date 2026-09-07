import React, { useState } from 'react';

function CreateTodo({ onCreate }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onCreate(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="create-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새 할 일을 입력하세요..."
        className="create-todo-input"
      />
      <button type="submit" className="create-todo-btn">
        추가
      </button>
    </form>
  );
}

export default CreateTodo;