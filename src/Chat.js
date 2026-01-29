import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./Chat.css";

const BASE_URL = "http://172.17.205.157:8080"; // 백엔드 주소
const WS_ENDPOINT = `${BASE_URL}/ws`;          // WebSocket 연결 엔드포인트
const TOPIC = "/topic/chat";                   // 서버가 뿌리는 토픽

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const stompRef = useRef(null);

  useEffect(() => {
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
    if (!text) return;

    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ⚠️ 백엔드 CreateReqDto 필드명에 맞춰야 함
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        const t = await res.text();
        console.error("POST /chat failed:", t);
        return;
      }

      setInput("");
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
            <span className="content">{msg.content ?? msg.text ?? JSON.stringify(msg)}</span>
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
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}