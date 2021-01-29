const db = require("../db")
const { serializeTodos } = require("../utils/serialize/todos")

async function todosQuery() {
  const todos = await db("todos")
    .select("todos.id", "todos.content", "todos.user_id")
    .select("users.username as user_username")
    .innerJoin("users", "todos.user_id", "users.id")

  const formattedTodos = serializeTodos(todos)

  console.log(JSON.stringify(formattedTodos, null, 2))
}

module.exports = todosQuery