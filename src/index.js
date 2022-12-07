import ReactDOM from 'react-dom/client';
import TicTacToeGame from './component/TicTacToeGame';
import './style/index.css';
import './style/modal.css';

// rendering
const tictactoeGame = ReactDOM.createRoot(
  document.getElementById('tictactoe-game')
);
tictactoeGame.render(<TicTacToeGame />);
