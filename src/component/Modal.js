export default function Modal({ winner, regameHandler, closeHandler }) {
  return (
    <div className="modal">
      <div className="box-modal">
        <header>
          <button className="btn-close" onClick={closeHandler}>
            X
          </button>
        </header>
        <section>
          <div className="winner">
            {winner ? ` ${winner}의 승리!` : '무승부!'}
          </div>
        </section>
        <footer>
          <button className="btn-regame" onClick={regameHandler}>
            게임 재시작하기
          </button>
        </footer>
      </div>
    </div>
  );
}
