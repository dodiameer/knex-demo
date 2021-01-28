const formatOutput = require("../formatOutput")

function serializeUser(user) {
  const { todos_id, todos_content, ...copy } = user
  copy.todos = [{ id: todos_id, content: todos_content }]
  return copy
}

function serializeUsers(users) {
  return formatOutput(users, "id", (existing, current) => {
    if (existing) {
      const copy = { ...existing }
      copy.todos = [...copy.todos, ...serializeUser(current).todos]
      return copy
    }
    else {
      const copy = { ...current }
      return serializeUser(copy)
    }
  })
}
module.exports = {
  serializeUser,
  serializeUsers,
}