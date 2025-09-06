exports.up = function(knex) {
  return knex.schema.createTable('aadhaar_verifications', (table) => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.string('aadhaar_number').notNullable();
    table.string('otp').notNullable();
    table.string('status').notNullable().defaultTo('pending');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('aadhaar_verifications');
};