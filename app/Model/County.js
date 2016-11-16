'use strict'

const Lucid = use('Lucid')

class County extends Lucid {
    sights () {
        return this.hasMany('App/Model/Sight')
    }
}

module.exports = County
