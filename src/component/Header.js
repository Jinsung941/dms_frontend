
import style from "../CSS/Header.module.css"
//사이트 메인 아이콘 + 구글 아이콘 + 방번호 + 완료/진행중 상태
function Header() {
  return (
    <div className={style.Maindiv}>

      <div className={style.Left}>
        <img/>
        <h3>Emmm</h3>
      </div>

      <div className={style.Right}>
        <img/>
        <img/>
        <div className={style.Number}></div>
        <img/>
      </div>

      
    </div>
  );
}

export default Header;


