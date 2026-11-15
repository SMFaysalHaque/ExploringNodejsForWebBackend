import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";
import routeHandler from "./routes/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request:", req)
    // console.log("Response:", res)
    // console.log("URL:", req.url)
    // console.log("Method:", req.method)
    routeHandler(req, res)
})

server.listen(config.port, () => {
    console.log(`Server is running ${config.port} successfully!!!`)
})