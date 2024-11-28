import fs from "node:fs/promises";

// delegando onde o arquivo será salvo
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    // lendo o conteudo do arquivo
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        // se tudo der certo o database recebe os dados de data
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        // se não exisir data o arquivo é criado em branco
        this.#persist();
      });
  }

  #persist() {
    // transformando em JSON
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    // a data só recebe valor se a tabela existir
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    // verificando se a database é um array, e se a tabela passada como parametro
    // existe dentro do banco
    if (Array.isArray(this.#database[table])) {
      // como a tabela já existe dentro do banco, fazemos um push()
      // para adicionar um novo item
      this.#database[table].push(data);
    } else {
      // se não criasse uma nova tabela
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
