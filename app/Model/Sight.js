'use strict'

const Lucid = use('Lucid')

class Sight extends Lucid {
    category () {
        return this.belongsTo('App/Model/Category')
    }

    county () {
        return this.belongsTo('App/Model/County')
    }
}

module.exports = Sight
