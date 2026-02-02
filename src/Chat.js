import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./Chat.css";
import EmojiPicker from 'emoji-picker-react';

const BASE_URL = "http://172.17.205.157:8080"; // 백엔드 주소
const WS_ENDPOINT = `${BASE_URL}/ws`;          // WebSocket 연결 엔드포인트
const TOPIC = "/topic/chat";                   // 서버가 뿌리는 토픽

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [file, setFile] = useState(null);

  const stompRef = useRef(null);

  useEffect(() => {
    //소켓 연결
    const socket = new SockJS(WS_ENDPOINT);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 1500,
      onConnect: () => {
        setConnected(true);
        console.log("STOMP 연결됨");

        client.subscribe(TOPIC, (frame) => {
          const data = JSON.parse(frame.body);
          setMessages((prev) => [...prev, data]);
        });
      },
      onWebSocketClose: () => {
        setConnected(false);
        console.log("WebSocket 종료");
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"], frame.body);
      },
    });

    client.activate();
    stompRef.current = client;

    return () => {
      client.deactivate();
      stompRef.current = null;
    };
  }, []);

  // ✅ 전송은 REST로: POST /chat  -> 백엔드가 /topic/chat로 broadcast
  const sendMessage = async () => {
    const text = input.trim();
    if (!text && !file) return;

    const formData = new FormData();

    formData.append(
      "data",
      new Blob(
        [JSON.stringify({ content: text })],
        { type: "application/json" }
      )
    );

    if (file) {
      formData.append("file", file);
    }

    await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      body: formData,
    });
    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        body: formData, // ⚠️ Content-Type 자동 설정됨
      });

      if (!res.ok) {
        console.error("POST /chat failed");
        return;
      }

      setInput("");
      setFile(null);
    } catch (e) {
      console.error("POST /chat error:", e);
    }
  };
  return (
    <div className="chat-container">
      <div style={{ marginBottom: 8, fontSize: 13, opacity: 0.8 }}>
        WS: <b>{connected ? "CONNECTED" : "DISCONNECTED"}</b>
      </div>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            {msg.content && <div>{msg.content}</div>}

            {msg.fileUrl && (
              <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                📎 {msg.fileName}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}