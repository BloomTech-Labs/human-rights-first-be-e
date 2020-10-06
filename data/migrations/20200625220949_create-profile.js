
exports.up = function (knex) {
  return knex.schema
    // .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('profiles', (profiles) => {
          profiles.string('id').notNullable().unique().primary();
          profiles.string('email');
          profiles.string('username');
          profiles.string('password');
          profiles.timestamps(true, true);
      })
      .createTable('itemtable', (itemtable) => {
        itemtable.string('id').notNullable().unique().primary();
        itemtable.string('city');
        itemtable.string('state');
        itemtable.integer('lat');
        itemtable.integer('long');
        itemtable.string('title');
        itemtable.string('desc');
        itemtable.string('src');
      });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('itemtable').dropTableIfExists('profiles');
};