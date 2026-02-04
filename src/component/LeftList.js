
import style from "../CSS/Left.module.css";
//방이름 
//더블 클릭 하면 이름 수정 할수있게 (input/p)전환
//현재 방장이 진행중인값을 저장 그리고 css수정
function LeftList() {
  return (
    <div className={style.Maindiv}>
      <h3>New Build</h3>
      <div className={style.List}>
        <div className={style.Block}>a</div>
        <div className={style.Block}>b</div>
        <div className={style.Block}>+</div>
        <div className={style.Block}>a</div>
        <div className={style.Block}>b</div>
        <div className={style.Block}>+</div>
        <div className={style.Block}>a</div>
        <div className={style.Block}>b</div>
        <div className={style.Block}>+</div>
        <div className={style.Block}>a</div>
        <div className={style.Block}>b</div>
        <div className={style.Block}>+</div>
      </div>
    </div>
  );
}

export default LeftList;
