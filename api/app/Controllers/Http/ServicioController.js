'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Servicio = use("App/Models/Servicio")
const ServicioProveedor = use("App/Models/ServicioProveedor")
const RespuestaProveedor = use("App/Models/RespuestaProveedor")
const ItemServicio = use("App/Models/ItemServicio")
/**
 * Resourceful controller for interacting with servicios
 */
class ServicioController {
  /**
   * Show a list of all servicios.
   * GET servicios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let serv = (await Servicio.query().where({}).with('items').fetch()).toJSON()
    response.send(serv)
  }

  async preguntasPorCheck ({ request, response, view }) {
    let body = request.only(['checks'])
    let preguntas = []
    for (let j of body.checks) {
      let serv = (await ItemServicio.query().where({id: j}).first()).toJSON()
      preguntas.push(serv)
    }
    response.send(preguntas)
  }

  async preguntasPorId ({ response, params }) {
    console.log(params.id_servicio, 'id servico')
    if (params.id_servicio === 'personas') {
      let buscar = [
        { id: 'haciendas' }, { id: 'hoteles' }, { id: 'restaurantes' }, { id: 'clubs' }, { id: 'galeria' }, { id: 'salon' }, { id: 'auditorias' }
      ]
      var proveedores = (await ServicioProveedor.where({ $and: buscar }).with('datos_proveedor').fetch()).toJSON()
    } else if (params.id_servicio === 'localizacion') {
      let buscar = [
        { id: 'mesero' }, { id: 'acomodador' }, { id: 'aseo' }, { id: 'seguridad' }, { id: 'traductores' }, { id: 'animador' }, { id: 'heventPlaner' }
      ]
      var proveedores = (await ServicioProveedor.where({ $or: buscar }).with('datos_proveedor').fetch()).toJSON()
    } else {
      var proveedores = (await ServicioProveedor.where({id: params.id_servicio}).with('datos_proveedor').fetch()).toJSON()
    }
    response.send(proveedores)
  }

  async serviciosPorProveedor ({ response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let servicios = (await ServicioProveedor.query().where({id_proveedor: idUser}).with('data_servicio').fetch()).toJSON()
    let format = servicios.map(v => {
      return {
        name: v.data_servicio.name,
        id: v.id,
        servicio_id: v.data_servicio.servicio_id,
        select: false,
      }
    })
    for (let j of format)
    j.servicioName = ((await Servicio.query().where({id: j.servicio_id}).first()).toJSON()).name

    response.send(format)
  }

  /**
   * Render a form to be used for creating a new servicio.
   * GET servicios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new servicio.
   * POST servicios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single servicio.
   * GET servicios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing servicio.
   * GET servicios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update servicio details.
   * PUT or PATCH servicios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a servicio with id.
   * DELETE servicios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServicioController
