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

  async obtenerCheckServiciosPerfil ({ request, response, params }) {
    let checks = (await ServicioProveedor.query().where({id_proveedor: params.id_proveedor}).fetch()).toJSON()
    let format = []
    for (let j of checks) {
      format.push(j.id)
    }
    response.send(format)
  }

  async obtenerCheckServiciosAnuncio ({ request, response, params }) {
    let checks = (await ServicioProveedor.query().where({id_proveedor: params.id_proveedor}).with('data_servicio').fetch()).toJSON()
    console.log(checks, 'checkes anuncio')
    let format = checks.map(j => {
      return {
        id: j.id,
        servicio_id: j.data_servicio.servicio_id,
        title: j.data_servicio.name
      }
    })

    response.send(format)
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

  async preguntasPorProveedor ({ response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let respuestaProveedor = (await RespuestaProveedor.query().where({id_proveedor: idUser}).with('servicio_info').fetch()).toJSON()
    for (let j of respuestaProveedor)
    j.name = (await ItemServicio.findBy('id', j.id)).name
    console.log(respuestaProveedor, 'respuesta proveedor')
    let preguntas = respuestaProveedor.map(v => {
      return { id: v.id, name: v.name, pregunta: v.pyr, servicio_id: v.servicio_id, _id: v._id, servicioName: v.servicio_info.name }
    })
    response.send(preguntas)
  }

  async preguntasPorProveedorId ({ response, params }) {
    let respuestaProveedor = (await RespuestaProveedor.query().where({id_proveedor: params.id_proveedor}).with('servicio_info').fetch()).toJSON()
    for (let j of respuestaProveedor)
    j.name = (await ItemServicio.findBy('id', j.id)).name
    console.log(respuestaProveedor, 'respuesta proveedor')
    let preguntas = respuestaProveedor.map(v => {
      return { id: v.id, name: v.name, pregunta: v.pyr, servicio_id: v.servicio_id, _id: v._id, servicioName: v.servicio_info.name }
    })
    response.send(preguntas)
  }

  async preguntasPorId ({ response, params, auth }) {
    console.log(params.id_servicio, 'ID SERVICIO')
    const searchByPais = ((await auth.getUser()).toJSON()).country
    console.log(searchByPais, 'search pais')
    if (params.id_servicio === 'personas') {
      console.log('entro1')
      let buscar = [
        { id: 'mesero' }, { id: 'acomodador' }, { id: 'aseo' }, { id: 'seguridad' }, { id: 'traductores' }, { id: 'animador' }, { id: 'heventPlaner' }
      ]
      var proveedores = (await ServicioProveedor.where({ $or: buscar }).with('datos_proveedor').fetch()).toJSON()
    } else if (params.id_servicio === 'localizacion') {
      console.log('entro2')
      let buscar = [
        { id: 'haciendas' }, { id: 'hoteles' }, { id: 'restaurantes' }, { id: 'clubs' }, { id: 'galeria' }, { id: 'salon' }, { id: 'auditorias' }
      ]
      var proveedores = (await ServicioProveedor.where({ $or: buscar }).with('datos_proveedor').fetch()).toJSON()
    } else {
      console.log('entro3')
      var proveedores = (await ServicioProveedor.where({id: params.id_servicio}).with('datos_proveedor').fetch()).toJSON()
    }
    console.log(proveedores, 'proveedores')

    let newArray = []
    for (let j of proveedores) {
      let buscarProveedor = newArray.find(v => v.id_proveedor === j.id_proveedor)
      if (!buscarProveedor) {
        j.pyr = await RespuestaProveedor.query().where({id: j.id, id_proveedor: j.id_proveedor}).first()
        newArray.push(j)
      }
    }

    let filtroPais = newArray.filter(v => v.datos_proveedor.country === searchByPais)

    response.send(filtroPais)
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
    let body = request.all()
    for (let j of body.preguntas) {
      await RespuestaProveedor.query().where({_id: j._id}).update({pyr: j.pyr})
      console.log(j._id, 'id', j.pyr, 'pyr')
    }

    response.send(body)
  }

  async modificarServiciosPreguntas ({request, response, auth}) {
    let preguntas = request.only(['preguntas'])
    let servicios = request.only(['servicios'])
    console.log(preguntas, 'pre', servicios, 'serv')
    const idUser = ((await auth.getUser()).toJSON())._id
    await ServicioProveedor.query().where({id_proveedor: idUser}).delete()
    let serviciosArrayOfObj = []
    for (let j of servicios.servicios) {
      await ServicioProveedor.create({id_proveedor: idUser, id: j})
    }


    await RespuestaProveedor.query().where({id_proveedor: idUser}).delete()
    for (let j of preguntas.preguntas) {
      j.id_proveedor = idUser
      await RespuestaProveedor.create(j)
    }
    response.send({message: 'todo bien'})
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
