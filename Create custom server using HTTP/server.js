const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Request Received", req.url, req.method);
    res.end("Server running!");
});

server.listen(1815, () => {
    console.log("Server running on port 1815...");
    console.log("Base URL: http://localhost:1815");
});
