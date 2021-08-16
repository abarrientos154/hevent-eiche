'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Opinion = use("App/Models/Opinion")
const Cotisation = use("App/Models/Cotisation")
const ProveedoresFavorito = use("App/Models/ProveedoresFavorito")
const Impression = use("App/Models/Impression")
const moment = require('moment')
/**
 * Resourceful controller for interacting with opinions
 */
class OpinionController {

  async estadisticas ({ response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let enviar = {}
    /////////SACAR PUNTUACIONES Y PROMEDIO////////////////////////////////////////////////////////
    let opiniones = (await Opinion.query().where('proveedor_id', idUser).fetch()).toJSON()
    console.log(opiniones, 'opiniones')
    if (opiniones.length > 0) {
      let objP = {
        calidadS: 0,
        costoB: 0,
        profesionalidad: 0,
        respuesta: 0,
        flexibilidad: 0
      }
      for (let j of opiniones) {
        objP.calidadS = objP.calidadS + j.calidadS
        objP.costoB = objP.costoB + j.costoB
        objP.profesionalidad = objP.profesionalidad + j.profesionalidad
        objP.respuesta = objP.respuesta + j.respuesta
        objP.flexibilidad = objP.flexibilidad + j.flexibilidad
      }

      let objPT = {
        calidadS: (objP.calidadS / opiniones.length),
        costoB: (objP.costoB / opiniones.length),
        profesionalidad: (objP.profesionalidad / opiniones.length),
        respuesta: (objP.respuesta / opiniones.length),
        flexibilidad: (objP.flexibilidad / opiniones.length),
      }

      let total = objPT.calidadS + objPT.costoB + objPT.profesionalidad + objPT.respuesta + objPT.flexibilidad
      objPT.puntuacion = (total / 5)

      enviar = objPT
    }  else {
      enviar.calidadS = 0
      enviar.costoB = 0
      enviar.profesionalidad = 0
      enviar.respuesta = 0
      enviar.flexibilidad = 0
      enviar.puntuacion = 0
    }


    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////SACAR CANTIDAD DE "ME GUSTA"////////////////////////////////////////////////////
    let likes = (await ProveedoresFavorito.query().where('proveedor_id', idUser).fetch()).toJSON()
    enviar.like = likes.length
    /////////////////////////////////////////////////////////////////////////////////////////////

    //////////////COTIZACIONES APROBADAS, RECHAZADAS y PAGADAS//////////////////////////////////

    //Aprobadas
    let ca = (await Cotisation.query().where({
      $or: [{ status: 2 }, { status: 4 }, { status: 5 }],
      proveedor_id: idUser
    }).fetch()).toJSON()
    enviar.ca = ca.length

    //Rechazadas
    let cr = (await Cotisation.query().where({
      status: 3,
      proveedor_id: idUser
    }).fetch()).toJSON()
    enviar.cr = cr.length

    //Pagadas
    let cp = (await Cotisation.query().where({
      $or: [{ status: 4 }, { status: 5 }],
      proveedor_id: idUser
    }).fetch()).toJSON()
    enviar.cp = cp.length
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////TIPO DE EVENTOS REALIZADOS///////////////////////////////////////
    let tipo = {
      celebracion: 0,
      boda: 0,
      corporativo: 0,
      reunion: 0,
      convencion: 0,
      artistico: 0,
      espiritual: 0,
      deportivo: 0
    }
    let cotisaciones = (await Cotisation.query().where({
      $or: [{ status: 4 }, { status: 5 }],
      proveedor_id: idUser
    }).with('evento').fetch()).toJSON()
    for (let j of cotisaciones) {
      if (j.evento.tipoEvento.id === 'celebracion') { tipo.celebracion += 1 }
      if (j.evento.tipoEvento.id === 'boda') { tipo.boda += 1 }
      if (j.evento.tipoEvento.id === 'corporativo') { tipo.corporativo += 1 }
      if (j.evento.tipoEvento.id === 'reunion') { tipo.reunion += 1 }
      if (j.evento.tipoEvento.id === 'convencion') { tipo.convencion += 1 }
      if (j.evento.tipoEvento.id === 'artistico') { tipo.artistico += 1 }
      if (j.evento.tipoEvento.id === 'espiritual') { tipo.espiritual += 1 }
      if (j.evento.tipoEvento.id === 'deportivo') { tipo.deportivo += 1 }
    }
    let dataChar = [ tipo.celebracion, tipo.boda, tipo.corporativo, tipo.reunion, tipo.convencion, tipo.artistico, tipo.espiritual, tipo.deportivo ]
    enviar.dataChar = dataChar
    ////////////////////////////////////////////////////////////////////////////////////////////
    enviar.tiempoR = '00:00'
    ////////////////////////////////--Impresiones--//////////////////////////////////
    let meses = {
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0
    }
    let impresiones = (await Impression.query().where({ proveedor_id: idUser }).fetch()).toJSON()
    for (let j of impresiones) {
      let mes = moment(j.created_at).lang('es').format('MMMM')
      console.log(mes, 'messsssssssss')
      if (mes === 'enero') { meses.enero += 1 }
      if (mes === 'febrero') { meses.febrero += 1 }
      if (mes === 'marzo') { meses.marzo += 1 }
      if (mes === 'abril') { meses.abril += 1 }
      if (mes === 'mayo') { meses.mayo += 1 }
      if (mes === 'junio') { meses.junio += 1 }
      if (mes === 'julio') { meses.julio += 1 }
      if (mes === 'agosto') { meses.agosto += 1 }
      if (mes === 'septiembre') { meses.septiembre += 1 }
      if (mes === 'octubre') { meses.octubre += 1 }
      if (mes === 'noviembre') { meses.noviembre += 1 }
      if (mes === 'diciembre') { meses.diciembre += 1 }
    }
    let dataCharImpression = [ meses.enero, meses.febrero, meses.marzo, meses.abril, meses.mayo, meses.junio, meses.julio, meses.agosto, meses.septiembre, meses.octubre, meses.noviembre, meses.diciembre ]
    enviar.dataCharImpression = dataCharImpression
    enviar.totalImpressions = impresiones.length

    response.send(enviar)
  }

  /**
   * Show a list of all opinions.
   * GET opinions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let data = (await Opinion.query().where('proveedor_id', idUser).with('usuario').with('usuario_proveedor').fetch()).toJSON()
    let formatData = data.map(v => {
      let sumas = v.costoB + v.calidadS + v.profesionalidad + v.respuesta + v.flexibilidad
      let total = (sumas / 5)
      return {
        ...v,
        created_at: moment(v.created_at).lang('es').calendar(),
        puntuacion: total
      }
    })
    response.send(formatData)
  }

  /**
   * Render a form to be used for creating a new opinion.
   * GET opinions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new opinion.
   * POST opinions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let body = request.only(['datos'])
    for (let j of body.datos) {
      await Opinion.create({
        ...j,
        user_id: idUser
      })
      await Cotisation.query().where({_id: j.cotisacion_id}).update({
        puntuado: true,
        fechaPuntuado: moment().format('DD/MM/YYYY'),
        status: 5
      })
    }
    response.send(body.datos)
  }

  /**
   * Display a single opinion.
   * GET opinions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async opinionesPorProveedorId ({ params, request, response }) {
    let data = (await Opinion.query().where('proveedor_id', params.id_proveedor).with('usuario').fetch()).toJSON()
    let formatData = data.map(v => {
      let sumas = v.costoB + v.calidadS + v.profesionalidad + v.respuesta + v.flexibilidad
      let total = (sumas / 5)
      return {
        ...v,
        created_at: moment(v.created_at).lang('es').calendar(),
        puntuacion: total
      }
    })
    response.send(formatData)
  }

  /**
   * Render a form to update an existing opinion.
   * GET opinions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update opinion details.
   * PUT or PATCH opinions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a opinion with id.
   * DELETE opinions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OpinionController
