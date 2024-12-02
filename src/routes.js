import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  // listagem
  {
    // método que será chamado
    method: "GET",
    // caminho da requisição
    path: buildRoutePath("/users"),
    // o que ela vai fazer
    handler: (req, res) => {
      const { search } = req.query;
      // armazenando os dados na const
      // selecionando o método (select) que vamos utilizar
      // passando como param a tabela que queremos fazer o select
      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );

      return res.end(JSON.stringify(users));
    },
  },
  // inserção
  {
    method: "POST",
    path: buildRoutePath("/users"),
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
  //deleção
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  //atualização
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, {
        name,
        email,
      });

      return res.writeHead(204).end();
    },
  },
];
