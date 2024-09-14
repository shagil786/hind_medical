import { app } from "./src/app";
import { createWebSocketServer } from "./src/service/websocket";

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

const wss = createWebSocketServer(server);

app.use((req: any, res, next) => {
  req.wss = wss;
  next();
})