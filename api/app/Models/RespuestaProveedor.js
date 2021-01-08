'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RespuestaProveedor extends Model {
  servicio_info () {
    return this.hasOne('App/Models/Servicio', 'servicio_id', 'id')
  }
}

module.exports = RespuestaProveedor
