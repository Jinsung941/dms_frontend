import { useEffect, useRef, useState } from "react";

function Meet() {

  const [isHost, setIshost] = useState(true);
  
  return (
    isHost ?
      <div></div>
      :
      <div></div>
  );
}

export default Meet;
