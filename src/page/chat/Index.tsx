import { useEffect, useRef, useState } from "react";

const ChatingPage = () => {
  const socket = useRef<WebSocket | null>(null);
  const [receive, setReceive] = useState<string[]>([]);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080/ws/chat");


    socket.current.onopen = () => {
      console.log("socket open");
      socket.current?.send("test");
    }

    socket.current.onclose = () => {
      console.log("socket close");
    }

    socket.current.onmessage = (message) => {
      console.log(message.data);
      setReceive(prev => [...prev, message.data]);
    }

    socket.current.onerror = (ev: Event) => {
      console.log(ev);
    }
  }, []);

  return (
    <div>
      <div>chating page</div>
      <hr />
      <div style={{ margin: 'auto', width: 300, height: 500, border: '1px solid black', borderRadius: 5, overflow: 'auto' }}>
        <div style={{ padding: 10 }}>
          {receive.map((message) =>
            <div style={{ display: 'flex', marginTop: 5 }}>
              <div style={{ width: 30, height: 30, marginRight: 5, border: '1px solid black', borderRadius: '100%' }}>
              </div>
              <div style={{ width: 100, border: '1px solid black', borderRadius: 3, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default ChatingPage;