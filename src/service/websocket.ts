import WebSocket from 'ws';

const createWebSocketServer = (server: any) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connected");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.send("Hello, client!");

    ws.on("close", () => {
      console.log("WebSocket disconnected");
    });
  });

  return wss;
};

export { createWebSocketServer };