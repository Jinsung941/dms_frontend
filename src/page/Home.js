import { useState } from "react";
import styles from "./Home.module.css";
import img from "../img/testimg.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isHost, setIshost] = useState(false);
  const navigate = useNavigate();

  function goArchived() {
    navigate("/archived");
  }

  function onProfile(){

  }

  return isHost ? (
    <div>hello</div>
  ) : (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={img} />
          <p>Emmm</p>
        </div>
        <div className={styles.profile} onClick={onProfile}>
          <img src={img} />
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.left}>+</div>
        <div className={styles.right}>
          <div className={styles.join}>
            Enter Code to Join Meeting
            <input></input>
          </div>
          <div className={styles.archive} onClick={goArchived}>
            archived
          </div>
        </div>
      </div>
      <div>
        In Process
        <input></input>
      </div>
    </div>
  );
}

export default Home;
