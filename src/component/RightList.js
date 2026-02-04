
import style from "../CSS/Right.module.css";

function RightList() {
  return (
    <div className={style.Maindiv}>
      <div className={style.Subdiv}>
        <div className={style.Block}>
          <img />
          <h3>파일</h3>
        </div>
        <div className={style.Block}>
          <img />
          <h3>파일</h3>
        </div>
        <div className={style.Block}>
          <img />
          <h3>파일</h3>
        </div>
      </div>
      <div className={style.Subdiv}>
        <div className={style.BigBlock}>
          <img />
          <h3>파일</h3>
        </div>
      </div>
    </div>
  );
}

export default RightList;
