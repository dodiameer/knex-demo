const formatOutput = require("../formatOutput")

function serializeTodo(todo) {
  const { user_username, ...copy } = todo
  copy.user = { username: user_username }
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