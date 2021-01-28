const db = require("./db")

async function seed() {
  await db.schema.createTable("users", table => {
    table.increments("id")
    table.string("username", 32).index("user_by_username")
  }).createTable("todos", table => {
    table.increments("id")
    table.string("content")
    table.integer("user_id").references("users.id")
  })

  const userRows = [
    ...await db("users").insert({ username: "dodiameer" }),
    ...await db("users").insert({ username: "noobslayer" })
  ]

  await db("todos").insert([
    {
      content: "Learn Knex",
      user_id: userRows[0]
    },
    {
      content: "Make a todos API",
      user_id: userRows[0]
    },
    {
      content: "Buy the Oppressor Mk.III",
      user_id: userRows[1]
    }
  ])
}

module.exports = seed