'use strict'

const User = require('../../Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Proveedor = use("App/Models/Proveedor")
const ProveedorDetalle = use("App/Models/ProveedorDetalle")
const ServicioProveedor = use("App/Models/ServicioProveedor")
const { validate } = use("Validator")
const Cruds = use('App/Functions/Cruds')
/**
 * Resourceful controller for interacting with proveedors
 */
class ProveedorController {

  async premiun ({ response, params }) {
    let proveedores = (await User.query().where({ plan_id: 3 }).fetch()).toJSON()
    let send = []
    for (let j in proveedores) {
      if (params.header === 'personas') {
        console.log('entro1')
        let buscar = [
          { id: 'mesero' }, { id: 'acomodador' }, { id: 'aseo' }, { id: 'seguridad' }, { id: 'traductores' }, { id: 'animador' }, { id: 'heventPlaner' }
        ]
        var service = (await ServicioProveedor.where({ $or: buscar, id_proveedor: proveedores[j]._id }).fetch()).toJSON()
      } else if (params.header === 'localizacion') {
        console.log('entro2')
        let buscar = [
          { id: 'haciendas' }, { id: 'hoteles' }, { id: 'restaurantes' }, { id: 'clubs' }, { id: 'galeria' }, { id: 'salon' }, { id: 'auditorias' }
        ]
        var service = (await ServicioProveedor.where({ $or: buscar, id_proveedor: proveedores[j]._id }).fetch()).toJSON()
      } else {
        console.log('entro3')
        var service = (await ServicioProveedor.where({id: params.header, id_proveedor: proveedores[j]._id}).fetch()).toJSON()
      }
      if (service.length > 0) {
        send.push(proveedores[j])
      }
    }
    console.log(proveedores, 'proveedores premiun', params, 'asd')
    response.send(send)
  }

  async index ({ request, response, view }) {
    let proveedores = (await Proveedor.all()).toJSON()
    response.send(proveedores)
  }

  async store ({ request, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let proveedor = await Proveedor.findBy('id_usuario_proveedor', idUser )
    console.log('porveedor', proveedor)
    if (!proveedor) {
      let requestAll = request.all()
      const validation = await validate(requestAll, Proveedor.fieldValidationRules())
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages())
      } else {
        let body = request.only(Proveedor.fillable)
        body.id_usuario_proveedor = idUser
        const provider = await Proveedor.create(body)
        response.send(provider)
      }
    } else {
      let requestAll = request.all()
      const validation = await validate(requestAll, Proveedor.fieldValidationRules())
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages())
      } else {
        let body = request.only(Proveedor.fillable)
        const provider = await Proveedor.where({id_usuario_proveedor: idUser}).update(body)
        response.send(provider)
      }
    }
  }


  async show ({ params, auth, response}) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let proveedor = await Proveedor.findBy('id_usuario_proveedor', idUser )
    if (!proveedor) {
      let user_data = await User.find(idUser)
      response.send({ form: { user_data: user_data } })
    } else {
      let user_data = await User.find(idUser)
      proveedor.user_data = user_data
      response.send({ form: proveedor })
    }
  }

  async showProviderForUser ({ params, response }) {
    // let user_data = await User.find(params.id)
    let detail_data = await User.find(params.id)
    if (detail_data) {
      // detail_data.user_data = user_data
      response.send(detail_data)
    } else {
      response.unprocessableEntity([{
        message: 'El proveedor aun no actualiza sus datos del perfil.'
      }])
    }
  }

  async showServicios ({ params, auth, response}) {
    let proveedores = (await Proveedor.all()).toJSON()
    let filtro = []
    if (proveedores.length > 0) {
      for (let element of proveedores) {
        console.log(element, 'elementoooooooooo')
        let servicio = element.servicios.find(servicio => servicio === params.id_servicio)
        if (servicio) {
          const datos_principales_proveedor = await User.find(element.id_usuario_proveedor)
          element.datos_principales_proveedor = datos_principales_proveedor
          filtro.push(element)
        }
      }
    }
    response.send(filtro)
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {

  }
}

module.exports = ProveedorController
