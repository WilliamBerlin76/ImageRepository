
exports.up = function(knex) {
    return knex.schema.createTable('images', tbl => {
        tbl.increments();

        tbl.string("display_name", 128)
            .notNullable();
        tbl.string("file_name", 128)
            .notNullable()
            .unique();
        tbl.string("file_path")
            .notNullable();
        tbl.boolean("private")
            .notNullable()
            .defaultTo(true);
        tbl.integer("price");
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('images');
};
