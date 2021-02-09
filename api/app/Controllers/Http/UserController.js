"use strict";

const User = use("App/Models/User")
const Notificacion = use("App/Models/Notificacion")
const Role = use("App/Models/Role")
const RespuestaProveedor = use("App/Models/RespuestaProveedor")
const ServicioProveedor = use("App/Models/ServicioProveedor")
const Email = use('App/Functions/Email')
const Cruds = use('App/Functions/Cruds')
const fs = require('fs')
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const { validate } = use("Validator")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async editarDCliente ({ request, response, auth }) {
    const formUser = ((await auth.getUser()).toJSON())
    let body = request.only(['full_name', 'telCode', 'phone', 'email'])
    console.log(body.email, 'asdbody', formUser.email, 'emas')
    if (body.email === formUser.email) {
      console.log('entro aqui')
      let user = await User.find(formUser._id)
      user.full_name = body.full_name
      user.telCode = body.telCode
      user.phone = body.phone
      await user.save()
      response.send(user)
    } else {
      console.log('entro aqui, asd')
      let buscarCorreo = (await User.query().where({ email: body.email }).fetch()).toJSON()
      console.log(buscarCorreo, 'correo')
      if (buscarCorreo.length > 0) {
        response.unprocessableEntity([{
          message: 'Correo ya registrado en el sistema!'
        }])
      } else {
        let user = await User.find(formUser._id)
        user.full_name = body.full_name
        user.telCode = body.telCode
        user.phone = body.phone
        user.email = body.email
        await user.save()
        response.send(user)
      }
    }

  }

  async guardarDescripcionProveedor({request, response, auth}) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let body = request.only(['descripcion'])
    let user = await User.query().where({_id: idUser}).update(body)
    response.send(user)
  }

  async index({ request, response, view }) {
    let users = await User.all();
    response.send(users);
  }

  async editarDatosProveedor({ request, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let requestAll = request.all()
    const validation = await validate(request.all(), User.fieldValidationRulesProveedor())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(User.fillableProveedor)
      let user = await User.find(idUser)
      console.log(body, 'body', requestAll, 'requestall')
      user.password = body.password
      await user.save()
      delete body.password
      await User.query().where({_id: idUser}).update(body)
      response.send(user)
    }

    //crear la funcion para editar
  }

  async showInfoProveedorAnuncio ({params, response}) {
    response.send(await User.find(params.id))
  }

  async show({ request, response, auth }) {
    let data = (await auth.getUser()).toJSON()
    let notificacion = await Notificacion.findBy('user_id', data._id.toString())
    data.notificacion = notificacion
    response.send(data)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(request.all(), User.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!'
      }])
    } else {
      let body = request.only(User.fillable)
      const rol = body.roles
      body.roles = [rol]
      const user = await User.create(body)
      // const user = body
      // Email.sendMail(body.email, 'Bienvenido a hevent', 'A partir de Ahora Formas Parte De Nuestra Plataforma')
      // const user = body
      response.send(user)
    }
  }

  async registrarProveedor ({ request, response }) {
    let dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, User.fieldValidationRulesProveedor())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: dat.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!'
      }])
    } else {
      let body = dat
      body.roles = [3]
      delete body.respuestas
      delete body.checks
      const user = await User.create(body)

      dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      let bodyServicios = dat.checks

      for (let j in bodyServicios) {
        let crear = {
          id: bodyServicios[j],
          id_proveedor: user._id.toString()
        }
        await ServicioProveedor.create(crear)
      }
      let bodyRespuestas = dat.respuestas
      for (let j of bodyRespuestas) {
        let crear = {
          pyr: []
        }
        for (let i of j.pregunta) {
          crear.id = j.id
          crear.servicio_id = j.servicio_id
          crear.pyr.push(i)
        }
        crear.id_proveedor = user._id.toString()
        await RespuestaProveedor.create(crear)
      }

      const profilePic = request.file('perfil', {
        size: '100mb'
      })
      if (Helpers.appRoot('storage/uploads/register')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/register'), {
          name: 'perfil' + user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      if (!profilePic.moved()) {
        return profilePic.error()
      }

      const profilePic2 = request.file('portada', {
        size: '100mb'
      })
      if (Helpers.appRoot('storage/uploads/register')) {
        await profilePic2.move(Helpers.appRoot('storage/uploads/register'), {
          name: 'portada' + user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      // const user = body
      // Email.sendMail(body.email, 'Bienvenido a hevent', 'A partir de Ahora Formas Parte De Nuestra Plataforma')
      // const user = body
      response.send(user)
    }
  }

  async registrarCliente ({ request, response }) {
    let recibir = request.all()
    console.log(recibir)
    const validation = await validate(recibir, User.fieldValidationRulesCliente())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: recibir.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!',
        error: true
      }])
    } else {
      let body = request.only(User.fillableCliente)
      body.roles=[2]
      body.perfil = false
      let guardar = await User.create(body)
      let bodyN = {
        user_id: guardar._id.toString(),
        eventMail: false,
        eventCel: false,
        susMail: false,
        susCel: false,
        proCel: false,
        proMail: false
      }
      guardar = await Notificacion.create(bodyN)
      response.send(guardar)
    }
  }

  async validateEmail({ request, response, params }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!',
        error: true
      }])
    } else {
      response.send({error: false})
    }
  }

  async userInfo({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    response.send(user)
  }

  async update({ request, response, params }) {
    let modelo = {
      accion: 'update',
      validar: {
        validar: true,
        datos: { name: 'string', last_name: 'string' }
      },
      modelo: 'User',
      autor: false,
      request: request.all(),
      requestOnly: request.only(['name', 'last_name']),
      unique_key: { field: '_id', value: (request.only(['_id']))._id }
    }
    let data = await Crud.crud(modelo)
    if (data.error) {
      response.unprocessableEntity([{
        message: data.msg
      }])
    } else { response.send(data) }
  }

  async destroy({ params, request, response }) {
    const { id } = params;
    const user = await User.find(id);
    await user.delete();
  }

  async login({ auth, request }) {
    const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    const user = (await User.findBy('email', email)).toJSON()
    let isUser = false
    token.roles = user.roles.map(roleMap => {
      if (roleMap === 3) {
        isUser = true
      }
      return roleMap
    })
    let userRoles = await Role.whereIn('id', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2)
      })
    })

    console.log(permissions, 'permissions')
    token.name = user.name
    token.lastName = user.lastName
    token.rating = user.rating
    token.email = user.email
    token.verify = user.verify
    let data = {}
    data.HEV_SESSION_INFO = token
    return data
  }

  showUser({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile";
    }
    return auth.user;
  }

    async userData({
      response,
      auth
    }) {
      let user = (await auth.getUser()).toJSON()
      for (let x = 0; x < user.roles.length; x++) {
        var s  = [user]
        const element = user.roles[x];
         if (element == 3) {
          /*  var s = await Country.query().where({
             _id: user.country
           }).with('user').fetch() */
         }
        if (element == 4) {
           var s = await Shop.query().where({
             user_id: user._id
           }).with('user').fetch()
        }
        if (element == 5) {
          var s = await Carrier.query().where({
            user_id: user._id
          }).with('user').fetch()
        }
      }
      response.send(s)
    }


}

module.exports = UserController;
