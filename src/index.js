const db = require("./db")
const { serializeTodos } = require("./utils/serialize/todos")
const { serializeUsers } = require("./utils/serialize/users")

// @ts-ignore
async function userQuery() {
  const users = await db("users")
    .select("users.id", "users.username")
    .select("todos.content as todos_content", "todos.id as todos_id")
    .innerJoin("todos", "todos.user_id", "users.id")

  const formattedUsers = serializeUsers(users)

  console.log(JSON.stringify(formattedUsers, null, 2))
}

async function todosQuery() {
  const todos = await db("todos")
    .select("todos.id", "todos.content", "todos.user_id")
    .select("users.username as user_username")
    .innerJoin("users", "todos.user_id", "users.id")

  const formattedTodos = serializeTodos(todos)

  console.log(JSON.stringify(formattedTodos, null, 2))
}

async function main() {
  // await userQuery()
  await todosQuery()
}

module.exports = main