'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  sights () {
        return this.hasMany('App/Model/Sight')
    }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = User
