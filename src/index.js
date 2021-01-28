const db = require("./db")
const formatOutput = require("./utils/formatOutput")

async function main() {
  const users = await db("users")
    .select("users.id", "users.username")
    .select("todos.content as todos_content", "todos.id as todos_id")
    .innerJoin("todos", "todos.user_id", "users.id")
  // const todos = await db("todos")
  //   .select("todos.id", "todos.content")
  //   .select("users.*")
  //   .innerJoin("users", "todos.user_id", "users.id")

  const formattedUsers = formatOutput(users, "id", (existing, current) => {
    console.log({ existing, current })
    if (existing) {
      const copy = { ...existing }
      copy.todos = [...copy.todos, { content: current.todos_content, id: current.todos_id }]
      return copy
    }
    else {
      const { todos_id, todos_content, ...copy } = current
      copy.todos = [{ id: todos_id, content: todos_content }]
      return copy
    }
  })

  console.log(JSON.stringify(formattedUsers, null, 2))
}

module.exports = main