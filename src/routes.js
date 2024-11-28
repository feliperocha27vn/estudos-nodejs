import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    // método que será chamado
    method: "GET",
    // caminho da requisição
    path: "/users",
    // o que ela vai fazer
    handler: (req, res) => {
      // armazenando os dados na const
      // selecionando o método (select) que vamos utilizar
      // passando como param a tabela que queremos fazer o select
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;

      const users = {
        // UUID => Unique Universal ID
        id: randomUUID(),
        name,
        email,
      };

      // acessando o método, passando o nome da tabela e depois a data, que é o
      // conteúdo
      database.insert("users", users);

      return res.writeHead(201).end();
    },
  },
];
