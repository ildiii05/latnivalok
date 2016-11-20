'use strict'

const Schema = use('Schema')

class PointsTableSchema extends Schema {

  up () {
    this.create('points', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('sight_id').unsigned().references('id').inTable('sights')
      table.integer('point').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('points')
  }

}

module.exports = PointsTableSchema
