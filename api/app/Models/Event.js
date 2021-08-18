'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  static get fillable() {
    return ['invitados', 'time', 'date', 'name', 'tipoEvento', 'ciudad']
  }
  static fieldValidationRules() {
    const rules = {
    }
    return rules
  }

  cotisations () {
    return this.hasMany('App/Models/Cotisation', '_id', 'event_id')
  }
  datos_cliente () {
    return this.hasOne('App/Models/User', 'cliente_id', '_id')
  }
  datos_proveedor () {
    return this.hasOne('App/Models/User', 'proveedor_id', '_id')
  }
  user_info () {
    return this.hasOne('App/Models/User', 'user_id', '_id')
  }
  cotisaciones () {
    return this.hasMany('App/Models/Cotisation', '_id', 'event_id')
  }
}

module.exports = Event
