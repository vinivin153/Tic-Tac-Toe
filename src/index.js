import { React, useState } from 'react';
import ReactDOM from 'react-dom/client';

function Square({ value, idx, onClickHandler }) {
  return (
    <button
      className="square"
      onClick={() => {
        onClickHandler(idx);
      }}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClickHandler }) {
  const render = () => {
    const board = [];

    for (let idx = 0; idx < 9; idx++) {
      board.push(
        <Square
          key={idx}
          idx={idx}
          value={squares[idx]}
          onClickHandler={onClickHandler}
        />
      );
    }

    return board;
  };

  return <div className="board">{render()}</div>;
}

function TicTacToeGame() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const onClickHandler = (idx) => {
    const newSquares = [...squares];

    newSquares[idx] = idx;
    setSquares(newSquares);
  };

  return (
    <div>
      <Board squares={squares} onClickHandler={onClickHandler} />
    </div>
  );
}

// rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TicTacToeGame />);
