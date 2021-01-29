const todosQuery = require("./queries/todos")
const usersQuery = require("./queries/users")

async function main() {
  console.log("-------Users-------")
  await usersQuery()
  console.log("-------Todos-------")
  await todosQuery()
}

module.exports = main