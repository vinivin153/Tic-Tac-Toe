import React from 'react';
import TicTacToeGame from './TicTacToeGame';

export default function Modal({ showModal, winner }) {
  const regameHandler = () => {};
  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`}>
      <div className="winner">{winner}의 승리!</div>
      <button className="regame" onClick={regameHandler}>
        게임 재시작하기
      </button>
    </div>
  );
}
