'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProveedoresFavorito extends Model {
  info_proveedor () {
    return this.hasOne('App/Models/User', 'proveedor_id', '_id')
  }
  pyr_proveedor () {
    return this.hasMany('App/Models/RespuestaProveedor', 'proveedor_id', 'id_proveedor')
  }
}

module.exports = ProveedoresFavorito
