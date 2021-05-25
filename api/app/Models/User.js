'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get fillable() {
    return ['email', 'password', 'full_name', 'city', 'country', 'birthdate', 'phone', 'roles', 'plan_id']
  }
  static fieldValidationRules() {
    const rulesUser = {
      full_name: "string",
      email: 'required|email',
      password: 'required|string|max:256',
      city: 'string',
      country: 'string',
      birthdate: 'string',
      phone: 'string',
      roles: 'number|required',
      plan_id: 'string'
    }
    return rulesUser
  }

  static get fillableProveedor () {
    return ['banco', 'celCode', 'celular', 'ciudad', 'descripcion', 'direccion', 'email', 'name', 'numCuenta', 'password',
      'personaContacto', 'plan_id', 'tipoPlan', 'telCode', 'telefono', 'tipoCuenta', 'username', 'ubicacion', 'country',
      'referencia'
    ]
  }
  static fieldValidationRulesProveedor () {
    const rulesUser = {
      banco: 'string',
      ubicacion: 'object',
      tipoPlan: 'string',
      celCode: 'string',
      celular: 'string',
      checks: 'array',
      ciudad: 'object',
      descripcion: 'string',
      direccion: 'string',
      email: 'email',
      name: 'string',
      numCuenta: 'string',
      password: 'string|max:256|required',
      personaContacto: 'string',
      plan_id: 'number',
      respuestas: 'array',
      telCode: 'string',
      telefono: 'string',
      tipoCuenta: 'string',
      username: 'string',
      country: 'string',
      referencia: 'string'
    }
    return rulesUser
  }
  static get fillableCliente () {
    return ['full_name', 'phone', 'email', 'password', 'telCode']
  }
  static fieldValidationRulesCliente () {
    const rulesUser = {
      full_name: 'string',
      phone: 'string',
      email: 'email',
      telCode: 'string',
      password: 'string|max:256|required',
    }
    return rulesUser
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }
  // static get objectIDs () { return [ 'country_id','_id', 'city_id' ] }
}

module.exports = User
