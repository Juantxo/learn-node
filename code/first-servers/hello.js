const http = require("http");
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

//create a new server object via the http module’s createServer()
// this server accepts HTTP requests and passes them on to our requestListener() function.
const server = http.createServer(requestListener);

//After we create our server, we must bind it to a network address
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
