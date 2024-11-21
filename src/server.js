import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    const usersJson = JSON.stringify(users);
    return res.setHeader("Content-type", "aplication/json").end(usersJson);
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@j.com",
    });
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
