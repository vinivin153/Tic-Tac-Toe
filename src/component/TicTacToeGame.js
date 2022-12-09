import { useRef, useState } from 'react';
import Modal from './Modal';
import ModalPortal from './ModalPortal';
import Board from './Board';

export default function TicTacToeGame() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([squares]);
  const [nextPlayer, setNextPlayer] = useState('X');
  const [result, setResult] = useState({
    winner: null,
    winnerRow: [],
  });
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

    if (isComeOutResult(newSquares) === false) {
      changeNextPlayer();
      return;
    }

    setShowModal(true);
  };

  const undoHandler = () => {
    if (!currentIdx.current) {
      alert("You can't click undo button anymore.");
      return;
    }

    changeNextPlayer();
    currentIdx.current -= 1;
    setHistory((history) => {
      const newHistory = [...history];
      newHistory.pop();

      return newHistory;
    });
  };

  const isWin = (squares) => {
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
        setResult({ winner: nextPlayer, winnerRow: row });
        return true;
      }
    }
    return false;
  };

  const isDraw = (squares) => {
    for (let idx = 0; idx < 9; idx++) {
      if (squares[idx] === null) {
        return false;
      }
    }

    return true;
  };

  const isComeOutResult = (squares) => {
    return isWin(squares) || isDraw(squares);
  };

  const initGame = () => {
    const newSquares = Array(9).fill(null);
    setSquares(newSquares);
    setHistory([newSquares]);
    setNextPlayer('X');
    setResult({ result: false, winner: null, winnerRow: [] });
    setShowModal(false);
    currentIdx.current = 0;
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  const regameHandler = () => {
    closeHandler();
    initGame();
  };

  return (
    <>
      <div className="next-player">Next Player: {nextPlayer}</div>
      <Board
        squares={history[currentIdx.current]}
        onClickHandler={onClickHandler}
        winnerRow={result.winnerRow}
      />
      <button className="undo" onClick={undoHandler}>
        Undo
      </button>
      {showModal ? (
        <ModalPortal>
          <Modal
            winner={result.winner}
            regameHandler={regameHandler}
            closeHandler={closeHandler}
          />
        </ModalPortal>
      ) : null}
    </>
  );
}
