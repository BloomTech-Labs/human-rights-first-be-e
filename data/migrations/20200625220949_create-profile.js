exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('incidents', (incidents) => {
      incidents.increments('incident_id');
      incidents.integer('ds_uuid').unique().notNullable();
      incidents.string('city');
      incidents.string('state');
      incidents.float('lat').notNullable();
      incidents.float('long').notNullable();
      incidents.string('title').notNullable();
      incidents.string('desc');
      incidents.date('date');
    })
    .createTable('sources', (sources) => {
      sources.increments('incident_id').notNullable().unique().primary();
      sources.integer('src_id');
      sources.string('src_url');
      sources.string('src_type');
    })
    .createTable('incident_type_of_force', (incident_type_of_force) => {
      incident_type_of_force.increments('itof_id');
      incident_type_of_force.integer('type_of_force_id').notNullable().unique();
      incident_type_of_force.integer('incident_id').notNullable().unique();
    })
    .createTable('type_of_force', (type_of_force) => {
      type_of_force.increments('type_of_force_id');
      type_of_force.string('type_of_force');
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('incidents')
    .dropTableIfExists('sources')
    .dropTableIfExists('incident_type_of_force')
    .dropTableIfExists('type_of_force');
};
