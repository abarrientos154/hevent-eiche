'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Impression = use("App/Models/Impression")

/**
 * Resourceful controller for interacting with impressions
 */
class ImpressionController {
  /**
   * Show a list of all impressions.
   * GET impressions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new impression.
   * GET impressions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new impression.
   * POST impressions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params, auth }) {
    const userId = ((await auth.getUser()).toJSON())._id
    let impresion = await Impression.query().where({ proveedor_id: params.proveedor_id, user_id: userId }).first()
    if (impresion) {
      await Impression.query().where({ proveedor_id: params.proveedor_id, user_id: userId }).update({
        cantidadVisto: impresion.cantidadVisto + 1
      })
      response.send({...impresion, cantidadVisto: impresion.cantidadVisto + 1 })
    } else {
      let crear = await Impression.create({
        proveedor_id: params.proveedor_id,
        user_id: userId,
        cantidadVisto: 1
      })
      response.send(crear)
    }
  }

  /**
   * Display a single impression.
   * GET impressions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing impression.
   * GET impressions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update impression details.
   * PUT or PATCH impressions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a impression with id.
   * DELETE impressions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ImpressionController
