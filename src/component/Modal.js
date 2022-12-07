export default function Modal({ winner, regameHandler }) {
  return (
    <div className="modal">
      <div className="winner">{winner}의 승리!</div>
      <button className="regame" onClick={regameHandler}>
        게임 재시작하기
      </button>
    </div>
  );
}
