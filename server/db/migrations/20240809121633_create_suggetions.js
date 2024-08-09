/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("suggetions", (table) => {
    table.increments("id").primary();
    // use "user" as foreign key to reference the users table and the id column
    table.string("suggested_by").notNullable();
    table.string("problem").notNullable();
    table.string("suggested_to").notNullable();
    table
      .foreign("suggested_by")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("suggested_to")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("created_at").defaultTo(knex.fn.now());
    table.date("updated_at").defaultTo(knex.fn.now());
    table.unique(["suggested_by", "problem", "suggested_to"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("suggetions");
};
