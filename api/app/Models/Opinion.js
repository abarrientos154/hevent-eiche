'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Opinion extends Model {
  usuario () {
    return this.hasOne('App/Models/User', 'user_id', '_id')
  }
}

module.exports = Opinion
