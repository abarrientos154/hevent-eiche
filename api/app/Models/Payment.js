'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {
  user_info () {
    return this.hasOne('App/Models/User', 'user_id', '_id')
  }
}

module.exports = Payment
