exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sources')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('sources').insert([
        { src_id: 20, src_url: 'poopy', src_type: 'ecks dee' },
      ]);
    });
};
