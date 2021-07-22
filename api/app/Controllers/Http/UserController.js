"use strict";

const User = use("App/Models/User")
const Notificacion = use("App/Models/Notificacion")
const Role = use("App/Models/Role")
const RespuestaProveedor = use("App/Models/RespuestaProveedor")
const ServicioProveedor = use("App/Models/ServicioProveedor")
const Payment = use("App/Models/Payment")
const Email = use('App/Functions/Email')
const Cruds = use('App/Functions/Cruds')
const fs = require('fs')
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const { validate } = use("Validator")
const Hash = use('Hash')
var randomize = require('randomatic')
const Env = use('Env')
const Flow = require('flowcl-node-api-client')
const moment = require('moment')

var configFlow = {
  apiKey: Env.get('FLOW_APIKEY'),
  secretKey: Env.get('FLOW_SECRETKEY'),
  apiURL: Env.get('FLOW_APIURL'),
  baseURL: Env.get('FLOW_BASEURL')
}

/*
  //////////////LEYENDA ESTATUS PROVEEDORES//////////////
  0 = A LA ESPERA POR PAGAR REGISTRO
  1 = ACTIVO
  2 = EN PROCESO POR PAGAR CAMBIO DE PLAN
*/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async getProviderByReference ({ response, params }) {
    const payment = (await Payment.query().where('ref', params.ref).with('user_info').first()).toJSON()
    console.log(payment, 'payment')
    response.send(payment.user_info)
  }

  async validarToken ({ response, auth }) {
    console.log(auth, 'auth')
    const user = ((await auth.getUser()).toJSON())
    console.log(user, 'user')
    if (user) {
      response.send(user)
    } else {
      response.unprocessableEntity('El token es invalido')
    }
  }

  async validarCambioPlan ({ params, auth, response }) {
    const formUser = ((await auth.getUser()).toJSON())
    const payment = (await Payment.query().where({
      user_id: formUser._id, status: 1
    }).fetch()).toJSON()
    const menanual = payment[0].tipoPlan === 'Mensual' ? 'month' : 'year'
    const endPlan = moment(payment[0].created_at).add(1, menanual)
    const difDias = moment(endPlan).diff(moment(), 'days')
    if (difDias > 15) {
      response.send({
        error: true,
        message: 'aun le quedan ' + difDias + ' dias de su plan actual'
      })
    } else {
      response.send({ ...payment, bonus: difDias > 0 ? difDias : 0})
    }
  }

  async userInfoById ({ response, params }) {
    const user = (await User.find(params.id)).toJSON()
    response.send(user)
  }

  async cambioPlanByWompi ({ response, params, request, auth }) {
    let body = request.only(['referencia', '_id', 'email', 'plan_id', 'tipoPlan', 'country', 'bonusDias' ])
    console.log(body, 'bodyd')
    await Payment.create({ ref: body.referencia, user_id: body._id , email: body.email, plan_id: body.plan_id, tipoPlan: body.tipoPlan, country: body.country, status: 0, bonusDias: body.bonusDias })
    let user = await User.query().where('_id', body._id).update({ status: 2, referencia: body.referencia })
    response.send(user)
  }

  async payFlowUpdateVerify ({ response, params, request, view }) {
    const body = request.post()
    let buscarPago = await Payment.findBy('ref', body.token)
    if (!buscarPago) {
      await Payment.create({ ref: body.token })
    }
    return view.render('flow-pay-update')
  }


  async payFlowUpdate ({ response, params, request, auth }) {
    const dat = request.only(['amount', 'email'])
    const idUser =  await User.findBy('email', dat.email) //(await auth.getUser()).toJSON()

    const parametros = {
      commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
      subject: 'Pago de prueba',
      currency: 'CLP',
      amount: dat.amount,
      email: dat.email,
      paymentMethod: 9,
      urlConfirmation: configFlow.baseURL + 'api/flow-pay-update',
      urlReturn: configFlow.baseURL + 'api/flow-pay-update',
    }

    const serviceName = 'payment/create'

    try {
      //console.log(Flow)
      // Instancia la clase FlowApi
      const flowApi = new Flow.default(configFlow)
      // Ejecuta el servicio
      var respon = await flowApi.send(serviceName, parametros, 'POST')
      // Prepara url para redireccionar el browser del pagador
      var redirect = respon.url + '?token=' + respon.token
      console.log(`location: ${redirect}`)
      await Payment.create({ ref: respon.token, user_id: idUser._id , email: idUser.email, plan_id: idUser.plan_id, tipoPlan: idUser.tipoPlan, country: idUser.country, status: 0 })
      await User.query().where('_id', idUser._id).update({ status: 2, referencia: respon.token })
      response.send({redirect, token: respon.token})
    } catch (error) {
      console.log(error)
      response.unprocessableEntity(error.message)
    }
  }

  async verificarPayFlow ({ response, params, request }) {
    let dat = params.ref
    const paramss = {
      token: dat
    }
    // const infoLocal = (await Floww.query().where({token: dat}).fetch()).toJSON()
    // var tienda = await Data.findBy('tienda_id', infoLocal[0].tienda_id)
    /* var config = {
       apiKey: tienda.apiKey,
       secretKey: tienda.secretKey,
       apiURL: Env.get('FLOW_APIURL'),
       baseURL: Env.get('FLOW_BASEURL')
    } */
    const serviceName = 'payment/getStatus'
    console.log(dat,'floww')
      try {
        //console.log(Flow)
        // Instancia la clase FlowApi
        const flowApi = new Flow.default(configFlow)
        // Ejecuta el servicio
        var respon = await flowApi.send(serviceName, paramss, 'get')
        // Prepara url para redireccionar el browser del pagador
        //var redirect = respon.url + '?token=' + respon.token
        console.log(`location: ${respon}`)
        // const infoLocal = (await Floww.query().where({token: dat}).fetch()).toJSON()
        response.send({flow: respon, status: respon.status})
      } catch (error) {
        console.log(error)
        response.unprocessableEntity(error.message)
      }
  }

  async payFlow ({ response, params, request }) {
    const dat = request.only(['amount', 'email'])
    const parametros = {
      commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
      subject: 'Pago de prueba',
      currency: 'CLP',
      amount: dat.amount,
      email: dat.email,
      paymentMethod: 9,
      urlConfirmation: configFlow.baseURL + 'pay-flow',
      urlReturn: configFlow.baseURL + 'pay-flow',
    }

    const serviceName = 'payment/create'

    try {
      //console.log(Flow)
      // Instancia la clase FlowApi
      const flowApi = new Flow.default(configFlow)
      // Ejecuta el servicio
      var respon = await flowApi.send(serviceName, parametros, 'POST')
      // Prepara url para redireccionar el browser del pagador
      var redirect = respon.url + '?token=' + respon.token
      console.log(`location: ${redirect}`)
      response.send({redirect, token: respon.token})
    } catch (error) {
      console.log(error)
      response.unprocessableEntity(error.message)
    }
  }

  async aprovedProvider({ response, params }) {
    console.log(params.ref, 'este es la referencia')
    let user = await User.query().where('referencia', params.ref).update({status: 1})
    await Payment.query().where('ref', params.ref).update({status: 1})
    response.send(user)
  }

  async verificarCode({ request, response, params }) {
    let user = await User.findBy('codigoRecuperacion', params.code)
    if (user) {
      response.send('VERIFICACION EXITOSA')
    } else {
      response.unprocessableEntity([{
        message: 'Codigo Invalido'
      }])
    }
  }

  async recuperacion({ request, response, params }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      let codigo = randomize('Aa0', 30)
      await User.query().where({email: params.email}).update({codigoRecuperacion: codigo})
      let user = (await User.query().where({email: params.email}).first()).toJSON()
      console.log(user, 'user')
      let mail = await Email.sendMail(params.email, 'Recuperacion de Correo', `
          <h1 style="text-align:left">
            Tu Contrasena
          </h1>
          <p>
            Hola ${user.name ? user.name : user.full_name}
            Quieres cambiar tu contrasena vinculada a esta cuenta? si es asi
            confirmar la sociedad. Este enlace es temporal y caduca a las 24 horas
          </p>
          <p>
            Si no tienes intencion de cambiar tu contrasena, ignorar este email. No
            te preocupes. Tu cuenta esta segura.
          </p>
          <p>
            Un saludo de parte del equipo de Hevent.
          </p>
          <div>
            <button style="width:200px;height:45px;background:#009CFF;color:white;border-radius:12px;border:0px solid red"
            >
            <a style="color:white" href="https://app.recuperatepass.com/recuperate_pass?codigo=${codigo}">CONFIRMAR</a>
            </button>
          </div>
      `)
      console.log(mail)
      response.send(user)
    } else {
      response.unprocessableEntity([{
        message: 'El correo ingresado no existe'
      }])
    }
  }

  async actualizarPass({ request, response, params }) {
    console.log(params.code, 'codeee')
    let user = await User.findBy('codigoRecuperacion', params.code)
    if (user) {
      let data = request.only(['password'])
      user.password = data.password
      console.log(data, 'data', user.password, 'user')
      user.codigoRecuperacion = null
      await user.save()
      response.send(user)
    } else {
      response.unprocessableEntity([{
        message: 'Codigo Invalido'
      }])
    }
  }

  async editarPCliente ({ request, response, auth }) {
    // get currently authenticated user
    const user = auth.current.user
    console.log(user, 'ser')

    // verify if current password matches
    const verifyPassword = await Hash.verify(
        request.input('oldPassword'),
        user.password
    )

    // display appropriate message
    if (!verifyPassword) {
      console.log('asd')
      response.unprocessableEntity([{
        message: 'Contraseña Actual Incorrecta'
      }])
    } else {
      console.log('asasdd')
      user.password = request.input('password')
      await user.save()
      response.send(user)
    }

  }

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
      body.status = 0 // a la espera por aprobar el pago
      const user = await User.create(body)

      dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      let bodyServicios = dat.checks

      await Payment.create({ ref: body.referencia, email: body.email, user_id: user._id.toString(), plan_id: body.plan_id, tipoPlan: body.tipoPlan })

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
      console.log(profilePic, 'asd')
      if (profilePic) {
        if (Helpers.appRoot('storage/uploads/register')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/register'), {
            name: 'perfil' + user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        if (!profilePic.moved()) {
          await User.query().where({ _id: user._id.toString() }).update({ perfil: false })
        }
      } else {
        await User.query().where({ _id: user._id.toString() }).update({ perfil: false })
      }

      const profilePic2 = request.file('portada', {
        size: '100mb'
      })

      if (profilePic2) {
        if (Helpers.appRoot('storage/uploads/register')) {
          await profilePic2.move(Helpers.appRoot('storage/uploads/register'), {
            name: 'portada' + user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        if (!profilePic2.moved()) {
          await User.query().where({ _id: user._id.toString() }).update({ portada: false })
        }
      } else {
        await User.query().where({ _id: user._id.toString() }).update({ portada: false })
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
    token.user_id = user._id
    token.name = user.name
    token.lastName = user.lastName
    token.rating = user.rating
    token.email = user.email
    token.verify = user.verify
    token.status = user.status ? user.status : 0
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
