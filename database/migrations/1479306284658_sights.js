'use strict'

const Schema = use('Schema')

class SightsTableSchema extends Schema {

  up () {
    this.create('sights', (table) => {
      table.increments()
      table.string('name', 100).notNullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('county_id').unsigned().references('id').inTable('counties')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('details').notNullable()
      table.string('approach').notNullable()
      table.string('imagepath')
      table.integer('point')
      table.timestamps()
    })
  }

  down () {
    this.drop('sights')
  }

}

module.exports = SightsTableSchema
