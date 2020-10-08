exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable('incident', function (incident) {
      incident.integer('incident_id').notNullable().unique().primary();
      incident.string('city');
      incident.string('state');
      incident.float('lat').notNullable();
      incident.float('long').notNullable();
      incident.string('title').notNullable();
      incident.string('desc');
      incident.date('date');
    })
    .createTable('sources', function (sources) {
      sources.integer('incident_id').notNullable().unique().primary();
      sources.integer('src_id');
      sources.string('src_url');
      sources.string('src_type');
    })
    .createTable('incident_type_of_force', function (incident_type_of_force) {
      // incident_type_of_force.integer('itof_id').notNullable().unique().primary();
      incident_type_of_force.integer('type_of_force_id').notNullable().unique();
      incident_type_of_force.integer('incident_id').notNullable().unique();
    })
    .createTable('type_of_force', function (type_of_force) {
      // type_of_force.integer('type_of_force_id').notNullable().unique().primary();
      type_of_force.string('type_of_force');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
