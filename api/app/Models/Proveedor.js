'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proveedor extends Model {
  static get fillable() {
    return ['description', 'adaptar_menu', 'alojamiento', 'banquete_cocina', 'banquete_exclusivo', 'banquete_o_cocina', 'bebida_servicio',
     'discapacitados', 'espacios_disp', 'fotografo_exclusivo', 'invitados', 'menu_conten', 'menu_costo', 'menu_especial', 'more_event',
     'musica_exclusivo', 'pago_lugar', 'pago_transaccion', 'ponque_matrimonio', 'ponque_propio', 'recargo', 'recargo_no_minimo', 'solo_lugar',
     'time_limit', 'tipo_cocina', 'servicios'
    ]
  }
  static fieldValidationRules() {
    const rules = {
      description: "string",
      adaptar_menu: "string",
      alojamiento: 'string',
      banquete_cocina: 'string',
      banquete_exclusivo: 'string',
      banquete_o_cocina: 'string',
      bebida_servicio: 'string',
      discapacitados: 'string',
      espacios_disp: 'string',
      fotografo_exclusivo: "string",
      invitados: 'string',
      menu_conten: 'string',
      menu_costo: 'string',
      menu_especial: 'string',
      more_event: 'string',
      musica_exclusivo: 'string',
      pago_lugar: 'string',
      pago_transaccion: "string",
      ponque_matrimonio: 'string',
      ponque_propio: 'string',
      recargo: 'string',
      recargo_no_minimo: 'string',
      solo_lugar: 'string',
      time_limit: 'string',
      tipo_cocina: 'string',
      servicios: 'array'
    }
    return rules
  }
  datos_principales () {
    return this.hasOne('App/Models/Proveedor', 'id_usuario_proveedor', '_id')
  }
}

module.exports = Proveedor
