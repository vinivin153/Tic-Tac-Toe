import React from 'react';
import ReactDOM from 'react-dom/client';

function Square({ idx }) {
  return <button className="square">{idx}</button>;
}

function Board() {
  const render = () => {
    const board = [];

    for (let idx = 0; idx < 9; idx++) {
      board.push(<Square idx={idx} />);
    }

    return board;
  };

  return <div className="board">{render()}</div>;
}

// rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Board />);
