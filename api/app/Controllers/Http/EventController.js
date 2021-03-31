'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Event = use("App/Models/Event")
const Cotisation = use("App/Models/Cotisation")
const moment = require('moment')
/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const id_user = ((await auth.getUser()).toJSON())._id
    let events = (await Event.query().where({user_id: id_user}).fetch()).toJSON()
    response.send(events)
  }

  async eventosPagadosPorProveedor ({response, auth}) {
    const id_user = ((await auth.getUser()).toJSON())._id
    const cotisations = (await Cotisation.query().where({status: 4, proveedor_id: id_user}).with('evento').with('datos_cliente').fetch()).toJSON()
    response.send(cotisations)
  }

  async eventosNoPagados ({ request, response, auth }) {
    const id_user = ((await auth.getUser()).toJSON())._id
    let events = (await Event.query().where({user_id: id_user, pay: false}).fetch()).toJSON()
    response.send(events)
  }

  /**
   * Render a form to be used for creating a new event.
   * GET events/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const id_user = ((await auth.getUser()).toJSON())._id
    let body = request.only(Event.fillable)
    body.user_id = id_user
    body.pay = false
    let event = await Event.create(body)
    response.send(event)
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let event = await Event.find(params.id)
    event.diasRestantes = moment(event.date).diff(moment(), 'days')
    response.send(event)
  }

  /**
   * Render a form to update an existing event.
   * GET events/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let dat = request.only(Event.fillable)
    console.log(dat, 'dat')
    let event = await Event.query().where('_id', params.id).update(dat)
    response.send(event)
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EventController
