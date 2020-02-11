const express = require("express");

const apiRouter = require("./api/api-router.js");

const server = express();

server.use(express.json());

server.use("/api", apiRouter);

server.get("/", (req, res) => {
    res.send(`
        <h2>Post Comments!</h2>
        <p>Welcome to the Page</p>
    `);
});

const port = 5000;
server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});