/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("friends", (table) => {
    table.increments("id").primary();
    // use "user" as foreign key to reference the users table and the id column
    table.string("user").notNullable();
    table.string("friend").notNullable();
    table
      .foreign("user")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("friend")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("created_at").defaultTo(knex.fn.now());
    table.date("updated_at").defaultTo(knex.fn.now());
    table.unique(["user", "friend"]);
    table.boolean("accepted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("friends");
};
