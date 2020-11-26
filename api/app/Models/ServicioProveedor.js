'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServicioProveedor extends Model {
  datos_proveedor () {
    return this.hasOne('App/Models/User', 'id_proveedor', '_id')
  }
  data_servicio () {
    return this.hasOne('App/Models/ItemServicio', 'id', 'id')
  }
}

module.exports = ServicioProveedor
