'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Servicio extends Model {
  items () {
    return this.hasMany('App/Models/ItemServicio', 'id', 'servicio_id')
  }
  test () {
    return this.hasMany('App/Models/ItemServicio', 'id', 'servicio_id')
  }
}

module.exports = Servicio
