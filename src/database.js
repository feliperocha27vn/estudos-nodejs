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

  select(table, search) {
    // a data só recebe valor se a tabela existir
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

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

  delete(table, id) {
    // BUSCANDO NO BANCO O ID
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    // SE TIVER A LINHA
    if (rowIndex > -1) {
      // SELECIONANDO E EXCLUINDO A LINHA
      this.#database[table].splice(rowIndex, 1);
      // persistindo o nosso banco
      this.#persist();
    }
  }

  update(table, id, data) {
    // BUSCANDO NO BANCO O ID
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    // SE TIVER A LINHA
    if (rowIndex > -1) {
      // reescrevendo os dados
      this.#database[table][rowIndex] = { id, ...data };
      // persistindo no nosso banco
      this.#persist();
    }
  }
}
