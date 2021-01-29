const db = require("../db")
const { serializeUsers } = require("../utils/serialize/users")

async function usersQuery(limit = 10, offset = 0) {
  const users = await db("users")
    .select("users.id", "users.username")
    .limit(limit)
    .offset(offset)

  const formattedUsers = serializeUsers(users)

  console.log(JSON.stringify(formattedUsers, null, 2))
}

module.exports = usersQuery