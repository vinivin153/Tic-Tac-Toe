import { useRef, useState } from 'react';
import Modal from './Modal';
import Board from './Board';

export default function TicTacToeGame() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([squares]);
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winnerRow, setWinnerRow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentIdx = useRef(0);
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

    const winnerRow = getWinnerRow(newSquares);
    setWinnerRow(winnerRow);

    if (isRowEmpty(winnerRow)) {
      changeNextPlayer();
      return;
    }

    setShowModal(true);
  };

  const isRowEmpty = (winnerRow) => {
    return winnerRow.length === 0;
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

  const getWinnerRow = (squares) => {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let row of rows) {
      if (
        squares[row[0]] !== null &&
        squares[row[0]] === squares[row[1]] &&
        squares[row[1]] === squares[row[2]]
      ) {
        return row;
      }
    }
    return [];
  };

  const initGame = () => {
    const newSquares = Array(9).fill(null);
    setSquares(newSquares);
    setHistory([newSquares]);
    setNextPlayer('X');
    setWinnerRow([]);
    setShowModal(false);
    currentIdx.current = 0;
  };

  const regameHandler = () => {
    setShowModal(false);
    initGame();
  };

  return (
    <>
      <div className="next-player">Next Player: {nextPlayer}</div>
      <Board
        squares={history[currentIdx.current]}
        onClickHandler={onClickHandler}
        winnerRow={winnerRow}
      />
      <button className="undo" onClick={undoHandler}>
        Undo
      </button>
      {showModal ? (
        <Modal winner={nextPlayer} regameHandler={regameHandler} />
      ) : null}
    </>
  );
}
