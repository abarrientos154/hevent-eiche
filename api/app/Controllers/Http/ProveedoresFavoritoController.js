'use strict'

const User = use("App/Models/User")
const ProveedoresFavorito = use("App/Models/ProveedoresFavorito")
/**
 * Resourceful controller for interacting with proveedoresfavoritos
 */
class ProveedoresFavoritoController {
  /**
   * Show a list of all proveedoresfavoritos.
   * GET proveedoresfavoritos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth, params }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const buscarP = (await ProveedoresFavorito.query().where({proveedor_id: params.id_proveedor, user_id: idUser}).fetch()).toJSON()
    console.log(buscarP, 'buscarp')
    if (buscarP.length > 0) {
      var favorito = true
    } else {
      var favorito = false
    }
    response.send({favorito: favorito})
  }

  async store ({ request, response, auth, params }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const buscarP = (await ProveedoresFavorito.query().where({proveedor_id: params.id_proveedor, user_id: idUser}).fetch()).toJSON()
    if (buscarP.length > 0) {
      await ProveedoresFavorito.query().where({proveedor_id: params.id_proveedor, user_id: idUser}).delete()
    } else {
      await ProveedoresFavorito.create({
        proveedor_id: params.id_proveedor,
        user_id: idUser
      })
    }
    response.send(buscarP)
  }

  async misFavoritos ({ request, response, auth, params }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const buscarP = (await ProveedoresFavorito.query().where({user_id: idUser}).with('info_proveedor').fetch()).toJSON()
    response.send(buscarP)
  }

  async proveedoresLike ({ response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const buscarP = (await ProveedoresFavorito.query().where({user_id: idUser}).with('info_proveedor').with('pyr_proveedor').fetch()).toJSON()
    const newData = {
      locacion: [],
      servicios: [],
      personas: []
    }
    for (let j of buscarP) {
      for (let i of j.pyr_proveedor) {
        if (i.servicio_id === 1) { newData.servicios.push(j) } else
        if (i.servicio_id === 2) { newData.locacion.push(j) } else
        if (i.servicio_id === 3) { newData.personas.push(j) }
      }
    }

    /* let sendData = {
      locacion: newData.locacion.filter(v => { return { v. } })
    } */
    response.send(newData)
  }


  /**
   * Display a single proveedoresfavorito.
   * GET proveedoresfavoritos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing proveedoresfavorito.
   * GET proveedoresfavoritos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update proveedoresfavorito details.
   * PUT or PATCH proveedoresfavoritos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a proveedoresfavorito with id.
   * DELETE proveedoresfavoritos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProveedoresFavoritoController
