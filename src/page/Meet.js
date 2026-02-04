import { useEffect, useRef, useState } from "react";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import style from "../CSS/Meet.module.css";

function Meet() {

  const [isHost, setIshost] = useState(true);

  return (
    <div className={style.Maindiv}>
      <div className={style.Header}>
        <Header />
      </div>
      
      <div className={style.Component}>
        <Left />
        <Right />
      </div>
    </div>
  );
}

export default Meet;
