import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request:", req)
    // console.log("Response:", res)
    // console.log("URL:", req.url)
    // console.log("Method:", req.method)
    const url = req.url // url provide use endpoint like: "/", "/products", "/id", "/courses" 
    const method = req.method // "GET", "POST", "PUT", "PATCH", "DELETE"
    
    if (url === "/" && method === "GET") {
        // console.log("This is root route")
        // plain text:
        // res.writeHead(200, {"content-type": "text/plain"});
        // res.end("This is root route!!!")
        // application json
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message: "This is root route!!!"})) // because TCP cannot read raw json. Json cannot be passed through TCP from the server. For that reason, we have to pass the data using "Stringify" so that TCP can read data from the server and transmit it through TCP, chunk by chunk.  
    } else if (url?.startsWith("/products")) {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({ message: "This is Products route!!!" }))
    } else {
        // console.log("This route is not defined")
        // plain text:
        // res.writeHead(404, {"content-type": "text/plain"});
        // res.end("This route is not defined!")
        // application json:
        res.writeHead(404, {"content-type": "text/plain"});
        res.end(JSON.stringify({message: "This route is not defined!"}))
    }
})

server.listen(5000, () => {
    console.log("Server is running successfully!!!")
})