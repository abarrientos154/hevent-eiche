'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Opinion = use("App/Models/Opinion")
const Cotisation = use("App/Models/Cotisation")
const ProveedoresFavorito = use("App/Models/ProveedoresFavorito")
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

    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////SACAR CANTIDAD DE "ME GUSTA"////////////////////////////////////////////////////
    let likes = (await ProveedoresFavorito.query().where('proveedor_id', idUser).fetch()).toJSON()
    enviar.like = likes.length
    /////////////////////////////////////////////////////////////////////////////////////////////

    //////////////COTIZACIONES APROBADAS, RECHAZADAS y PAGADAS//////////////////////////////////

    //Aprobadas
    let ca = (await Cotisation.query().where({
      $or: [{ status: 2 }, { status: 4 }, { status: 5 }]
    }).fetch()).toJSON()
    enviar.ca = ca.length

    //Rechazadas
    let cr = (await Cotisation.query().where({
      status: 3
    }).fetch()).toJSON()
    enviar.cr = cr.length

    //Pagadas
    let cp = (await Cotisation.query().where({
      $or: [{ status: 4 }, { status: 5 }]
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
      espiritual: 0
    }
    let cotisaciones = (await Cotisation.query().where({
      $or: [{ status: 4 }, { status: 5 }]
    }).with('evento').fetch()).toJSON()
    for (let j of cotisaciones) {
      if (j.evento.tipoEvento.id === 'celebracion') { tipo.celebracion += 1 }
      if (j.evento.tipoEvento.id === 'boda') { tipo.boda += 1 }
      if (j.evento.tipoEvento.id === 'corporativo') { tipo.corporativo += 1 }
      if (j.evento.tipoEvento.id === 'reunion') { tipo.reunion += 1 }
      if (j.evento.tipoEvento.id === 'convencion') { tipo.convencion += 1 }
      if (j.evento.tipoEvento.id === 'artistico') { tipo.artistico += 1 }
      if (j.evento.tipoEvento.id === 'espiritual') { tipo.espiritual += 1 }
    }
    let dataChar = [ tipo.celebracion, tipo.boda, tipo.corporativo, tipo.reunion, tipo.convencion, tipo.artistico, tipo.espiritual ]
    enviar.dataChar = dataChar
    console.log(dataChar, 'asdasdasdasdas')
    ////////////////////////////////////////////////////////////////////////////////////////////
    enviar.tiempoR = '00:00'
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
