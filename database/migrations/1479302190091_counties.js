'use strict'

const Schema = use('Schema')

class CountiesTableSchema extends Schema {

  up () {
    this.create('counties', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('counties')
  }

}

module.exports = CountiesTableSchema
