'use strict'

const Schema = use('Schema')

class PointsTableSchema extends Schema {

  up () {
    this.create('points', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('point').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('points')
  }

}

module.exports = PointsTableSchema
