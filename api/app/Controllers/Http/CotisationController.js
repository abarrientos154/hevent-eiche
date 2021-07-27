'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cotisations
 */

const Cotisation = use("App/Models/Cotisation")
const Chat = use("App/Models/Chat")
const ChatMessage = use("App/Models/ChatMessage")
const Event = use("App/Models/Event")
const Payment = use("App/Models/Payment")
const moment = require('moment')
const ItemServicio = use("App/Models/ItemServicio")

/*
  //////////////////////Leyenda del campo status para las cotizaciones///////////
  0 = En proceso con chat activo
  1 = Cotizado y a la espera para que el cliente apruebe o rechaze la cotizacion, aqui ya no se pueden enviar msj ni volver a cotizar
  2 = Aprobado por el cliente y en espera para pagar
  3 = Rechazado por el Cliente
  4 = Pagado por el cliente y a la espera de la fecha final del evento
  5 = Evento Finalizado o Cotizacion Finalizada

  ///////////Leyenda del Campo Estatus para El Modelo Eventos////////////////////
  5 = Evento Finalizado
*/

class CotisationController {

  async cotizacionesPendientesLength ({ params, request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
      status: { $gte: 1 }
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    for (let j of cotisations) {
      j.rolAuth = user.roles[0]
      for (let i in j.detallesServicios) {
        j.detallesServicios[i].total = 0
        for (let h in j.detallesServicios[i].list ) {
          j.detallesServicios[i].total = j.detallesServicios[i].total + parseFloat(j.detallesServicios[i].list[h].valor)
        }
      }
    }
    response.send(cotisations.length)
  }

  async eventosRealizados ({ response, auth }) {
    let eventos = (await Event.where({
      pay: true,
      date: { $lte: moment().format('YYYY/MM/DD') }
    }).with('user_info').fetch()).toJSON()
    let send = []
    for (let j of eventos) {
      let cotisaciones = (await Cotisation.query().where({ event_id: j._id, status: { $lte: 4 }, puntuado: false }).with('datos_proveedor').fetch()).toJSON()
      if (cotisaciones.length > 0) {
        for (let i of cotisaciones) {
          send.push(i)
        }
      }
    }

    response.send(send)
  }

  async store ({ request, response, params, auth }) {
    const id_user = ((await auth.getUser()).toJSON())._id
    let body = {
      cliente_id: id_user,
      proveedor_id: params.id_proveedor,
      event_id: params.id_event,
      status: 0
    }
    let cotizacion = await Cotisation.create(body)
    body = {}
    body.cotizacion_id = (cotizacion._id).toString()
    await Chat.create(body)

    let evento = (await Event.find(params.id_event)).toJSON()
    await ChatMessage.create({
      message: `
        Titulo: ${evento.name},
        Tipo de evento: ${evento.tipoEvento.title},
        Invitados: #${evento.invitados},
        Fecha: ${evento.date},
        Hora: ${evento.time},
        Direccion: ${evento.direccion}
      `,
      user_id: id_user,
      cotisazion_id: body.cotizacion_id,
      visto: false
    })
    response.send(cotizacion)
  }

  async enviarCotizacion ({ request, response, auth, params }) {
    let carrito = request.only(['carrito'])
    carrito.status = 1
    let modificar = await Cotisation.query().where({_id: params.id}).update(carrito)
    response.send(modificar)
  }

  /**
   * Display a single cotisation.
   * GET cotisations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showAllInfoCotisation ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    const id_user = user._id
    let cotisation = (await Cotisation.query().where('_id',params.id_cotisation).with('datos_proveedor').with('datos_cliente').with('datos_proveedor_detalles').first()).toJSON()
    console.log(cotisation, 'asssssssssssss')
    let update_visto = (await ChatMessage.query().where({cotisazion_id: params.id_cotisation, user_id: user.roles[0] === 2 ? cotisation.proveedor_id : cotisation.cliente_id }).update({visto: true})).toJSON()
    let send = {
      datos_proveedor: cotisation.datos_proveedor,
      datos_cliente: cotisation.datos_cliente,
      messages: [],
      carrito: cotisation.carrito ? cotisation.carrito : false,
      status: cotisation.status ? cotisation.status : 0
    }
    send.datos_proveedor.detalles = cotisation.datos_proveedor_detalles
    let messages = (await ChatMessage.where({cotisazion_id: params.id_cotisation}).with('datos_user').fetch()).toJSON()
    send.messages = messages
    send.messages = messages.map(v => {
      return {
        send: id_user === v.user_id ? true : false,
        perfil: id_user === v.user_id ? true : v.datos_user.perfil ? true : false,
        img: v.datos_user.perfil,
        id: v.datos_user._id,
        message: v.message,
        stamp: moment(v.created_at).lang('es').calendar(),
        full_name: v.datos_user.full_name
      }
    })
    response.send(send)
  }

  async getChat ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }]
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    for (let j in cotisations) {
      console.log(cotisations[j]._id, 'wwwwwwwwwww')
      var messages = await ChatMessage.where({cotisazion_id: cotisations[j]._id}).sort({created_at: -1}).limit(1).first()
      if (messages) {
        cotisations[j].last_message = messages.message
        cotisations[j].created_at_message = messages.created_at
        cotisations[j].visto = user._id === messages.user_id ? true : messages.visto
      }
    }
    let format_cotisations = cotisations.map(v => {
      if (messages) {
        console.log(messages.toJSON(), 'aaaa')
        return {
          _id: v._id,
          id_usuario: user.roles[0] == 2 ? v.datos_proveedor._id : v.datos_cliente._id,
          full_name: user.roles[0] !== 2 ? v.datos_cliente.full_name : v.datos_proveedor.name,
          perfil: user.roles[0] !== 2 ? v.datos_cliente.perfil : v.datos_proveedor.perfil,
          last_message: v.last_message,
          created_at_message: moment(v.created_at_message).lang('es').calendar(),
          visto: v.visto,
          status: v.status ? v.status : 0
        }
      } else {
        console.log(messages, 'bbbbb')
        return {
          _id: v._id,
          id_usuario: user.roles[0] === 2 ? v.datos_proveedor._id : v.datos_cliente._id,
          full_name: user.roles[0] === 3 ? v.datos_cliente.full_name : v.datos_proveedor.name,
          last_message: 'Escribe un mensaje',
          created_at_message: moment().format('DD/MM/YYYY'),
          visto: true,
          status: v.status ? v.status : 0
        }
      }
    })
    response.send(format_cotisations)
  }


  async addDetailServices ({ params, request, response }) {
    let body = request.only(['detallesServicios', 'total'])
    body.status = 1 // Pendiente por Aprobar para el Cliente
    await Cotisation.query().where({_id: params.id_cotisation}).update(body)
    response.send(body)
  }

  async showDetailServiceById ({ params, request, response, auth }) {
    let cotisation = await Cotisation.find(params.id_cotisation)
    let services = cotisation.detallesServicios.find(v => v.id === params.id_service)
    response.send(services)
  }

  async getCotisationInStatus ({ params, request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
      status: { $gte: 1 }
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    for (let j of cotisations) {
      j.rolAuth = user.roles[0]
      for (let i in j.detallesServicios) {
        j.detallesServicios[i].total = 0
        for (let h in j.detallesServicios[i].list ) {
          j.detallesServicios[i].total = j.detallesServicios[i].total + parseFloat(j.detallesServicios[i].list[h].valor)
        }
      }
    }
    response.send(cotisations)
  }

  async approveQuote ({params, response, auth}) {
    const body = { status: 2 } //Cotizacion Aprobada
    let update = await Cotisation.query().where({_id: params.id}).update(body)
    response.send(update)
  }

  async disapproveQuote ({params, response, auth}) {
    //const body = request.only(['reason'])
    const body = { status: 3 } //Cotizacion Desaprobada
    let update = await Cotisation.query().where({_id: params.id}).update(body)
    response.send(update)
  }

  async payQuotes ({params, response, auth, request}) {
    const body = {}
    body.status = 4 //Cotizacion Pagada y a la espera por finalizar el evento
    body.fechaPagado = moment().format('DD-MM-YYYY')
    let update = await Cotisation.query().where({event_id: params.event_id, status: 2, puntuado: false}).update(body)

    const bodyT = request.only(['total', 'amount_in_cents', 'wompi', 'flow'])
    bodyT.event_id = params.event_id
    bodyT.event = true
    await Payment.create(bodyT)

    let bodyE = {}
    bodyE.pay = true
    bodyE.fechaPagado = moment().format('DD-MM-YYYY')
    update = await Event.query().where({_id: params.event_id}).update(bodyE)

    response.send(update)
  }

  async getEvents ({params, response, auth, request}) {
    const user = (await auth.getUser()).toJSON()
    let eventos = (await Event.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }]
    }).with('cotisations').fetch()).toJSON()
    console.log(eventos, 'eventosssss')
    let meventos = eventos.map(v => {
      return {
        title: v.title ? v.title : 'Sin Titulo',
        startDate: v.startDate,
        endDate: v.endDate,
        status: v.status,
        id: v._id
      }
    })
    /* for (let j of meventos) {
      j.cotisations = (await Cotisation.where({event_id: j.id}).fetch()).toJSON()
    } */
    response.send(meventos)
  }

  async getEventById ({params, response, auth}) {
    const user = (await auth.getUser()).toJSON()
    let event = (await Event.query().where({_id: params.id}).with('datos_cliente').first()).toJSON()
    let cotisation = (await Cotisation.where({
      event_id: event._id.toString(),
      proveedor_id: user._id
    }).fetch()).toJSON()
    event.cotisation = cotisation
    response.send(event)
  }

  async quotesByStatusApprove ({params, response, auth, request}) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
      status: 2
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    // let update = await Cotisation.query().where({_id: params.id}).update(body)
    if (cotisations.length !== 0) {
      var total = 0
      for (let item of cotisations) {
        total = total + item.total
      }
      var enviar = {
        totalCotisaciones: total,
        cotisasiones: cotisations,
        pay: false
      }
    } else {
      console.log('ELSEE')
      cotisations = (await Cotisation.where({
        $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
        status: 4
      }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
      var total = 0
      for (let item of cotisations) {
        total = total + item.total
      }
      var enviar = {
        totalCotisaciones: total,
        cotisasiones: cotisations,
        pay: true
      }
    }
    response.send(enviar)
  }
  async cotisationsByEvent ({params, response, auth, request}) {
    let cotisations = (await Cotisation.where({
      event_id: params.event_id,
      $or: [{ status: 2 }, { status: 4 }],
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    let servicios = [
      {
        servicio_id: 1,
        servicioName: 'Servicios',
        subitems: [
          /* {
            id: 'alimentos',
            name: 'Alimentos',
            proveedores: [
              {
                proveedor_id: 'j.proveedor_id',
                proveedorName: 'j.datos_proveedor.name',
                productos: []
              }
            ]
          } */
        ]
      },
      {
        servicio_id: 2,
        servicioName: 'Locación',
        subitems: []
      },
      {
        servicio_id: 3,
        servicioName: 'Personal',
        subitems: []
      }
    ]
    let proveedores = []
    for (let j of cotisations) {
      let objPush = { proveedor_id: j.proveedor_id, proveedorName: j.datos_proveedor.name }
      for (let h of j.carrito) {
        for (let i of h.subitems) {
          proveedores.push({
            servicio_id: h.servicio_id,
            servicioName: h.servicioName,
            ...objPush,
            ...i
          })
        }
      }
    }
    for (let j of proveedores) {
      let indexServicio = servicios.findIndex(v => v.servicio_id === j.servicio_id)
      let indexSubSer = servicios[indexServicio].subitems.findIndex(v => v.id === j.id)
      if (indexSubSer >= 0) {
        console.log('entroe')
        servicios[indexServicio].subitems[indexSubSer].proveedores.push({
          proveedor_id: j.proveedor_id,
          proveedorName: j.proveedorName,
          productos: j.productos
        })
      } else {
        console.log('NO entro')
        servicios[indexServicio].subitems.push({
          id: j.id,
          name: j.name,
          proveedores: [
            {
              proveedor_id: j.proveedor_id,
              proveedorName: j.proveedorName,
              productos: j.productos
            }
          ]
        })
      }
    }
    response.send(servicios)
  }

  async getCotisacionById ({params, response, auth, request}) {
    let cotisations = (await Cotisation.where({
      _id: params.id
    }).with('datos_proveedor').with('datos_cliente').first()).toJSON()
    let enviar = {
      carrito: [],
      status: cotisations.status
    }
    for (let h of cotisations.carrito) {
      let indexItem = enviar.carrito.findIndex(v => v.servicio_id === h.servicio_id)
      if (indexItem >= 0) {
        for (let i of h.subitems) {
          let indexSubItem = enviar.carrito[indexItem].subitems.findIndex(v => v.id === i.id)
          console.log(i.productos, 'iiiii')
          if (indexSubItem >= 0) {
            let array = enviar.carrito[indexItem].subitems[indexSubItem].productos
            enviar.carrito[indexItem].subitems[indexSubItem].productos = array.concat(i.productos)
          }
        }
      } else {
        enviar.carrito.push(h)
      }
    }
    response.send(enviar)
  }

}

module.exports = CotisationController
