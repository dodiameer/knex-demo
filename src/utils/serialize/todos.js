const formatOutput = require("../formatOutput")

function serializeTodo(todo) {
  const { user_username, user_id, ...copy } = todo
  copy.user = { id: user_id, username: user_username }
  return copy
}

function serializeTodos(todos) {
  return formatOutput(todos, "id", (_existing, current) => {
    return serializeTodo(current)
  })
}

module.exports = {
  serializeTodo,
  serializeTodos,
}