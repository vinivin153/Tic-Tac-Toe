import React from 'react';

export default function Square({ value, idx, onClickHandler, highlight }) {
  return (
    <button
      className={`square${highlight}`}
      onClick={() => {
        onClickHandler(idx);
      }}
    >
      {value}
    </button>
  );
}
