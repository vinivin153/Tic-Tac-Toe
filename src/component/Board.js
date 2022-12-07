import React from 'react';
import Square from './Square';

export default function Board({ squares, onClickHandler, winnerRow }) {
  const render = () => {
    const board = [];
    const winnerRowSet = new Set(winnerRow);
    for (let idx = 0; idx < 9; idx++) {
      board.push(
        <Square
          key={idx}
          idx={idx}
          value={squares[idx]}
          onClickHandler={onClickHandler}
          highlight={winnerRowSet.has(idx) ? ' highlight' : ''}
        />
      );
    }

    return board;
  };

  return <div className="board">{render()}</div>;
}
