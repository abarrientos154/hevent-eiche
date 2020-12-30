'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  static get fillable() {
    return ['invitados', 'time', 'date', 'name', 'tipoEvento', 'direccion']
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
}

module.exports = Event
