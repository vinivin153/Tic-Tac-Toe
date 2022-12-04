import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
  const [history, setHistory] = useState([squares]);
  const [nextPlayer, setNextPlayer] = useState('X');
  const currentIdx = useRef(history.length - 1);

  const changeNextPlayer = () => {
    setNextPlayer((nextPlayer) => {
      return nextPlayer === 'X' ? 'O' : 'X';
    });
  };

  const onClickHandler = (idx) => {
    const newSquares = [...history[currentIdx.current]];

    if (newSquares[idx]) return;

    newSquares[idx] = nextPlayer;
    setSquares(newSquares);
    setHistory([...history, newSquares]);
    currentIdx.current += 1;
    changeNextPlayer();
  };

  const undoHandler = () => {
    changeNextPlayer();
    currentIdx.current -= 1;
    setHistory((history) => {
      const newHistory = [...history];
      newHistory.pop();

      return newHistory;
    });
  };

  return (
    <>
      <div>
        <div className="next-player">Next Player: {nextPlayer}</div>
        <Board
          squares={history[currentIdx.current]}
          onClickHandler={onClickHandler}
        />
      </div>
      <div>
        <button className="undo" onClick={undoHandler}>
          Undo
        </button>
      </div>
    </>
  );
}

// rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TicTacToeGame />);
