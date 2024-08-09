/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("problems", (table) => {
    table.increments("id").primary();
    // use "user" as foreign key to reference the users table and the id column
    table.string("user").notNullable();
    table.string("url").notNullable();
    table
      .foreign("user")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("created_at").defaultTo(knex.fn.now());
    table.date("updated_at").defaultTo(knex.fn.now());
    table.unique(["user", "url"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("problems");
};
