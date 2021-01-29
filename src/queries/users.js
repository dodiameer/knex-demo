const db = require("../db")
const { serializeUsers } = require("../utils/serialize/users")

async function usersQuery() {
  const users = await db("users")
    .select("users.id", "users.username")
    .select("todos.content as todos_content", "todos.id as todos_id")
    .innerJoin("todos", "todos.user_id", "users.id")

  const formattedUsers = serializeUsers(users)

  console.log(JSON.stringify(formattedUsers, null, 2))
}

module.exports = usersQuery