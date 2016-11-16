'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    sights () {
        return this.hasMany('App/Model/Sight')
    }
}

module.exports = Category
