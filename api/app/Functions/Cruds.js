
/*
EJEMPLO
  let modelo = {
      accion: 'delete',
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
    } else { response.send(data) } */

    const { validate } = use("Validator")

    exports.crud = async (modelo, auth) => {
      const Modelo = use(`App/Models/${modelo.modelo}`)
      if (modelo.accion === 'store') {
        if (modelo.validar.validar) {
          const validation = await validate(modelo.request, modelo.validar.datos)
          if (validation.fails()) {
            return {
              error: true,
              msg: 'La Validacion Fallo'
            }
          } else {
            let data = modelo.requestOnly
            if (modelo.autor) { data.user_id = auth._id }
            body = await Modelo.create(data)
            return {
              error: false,
              body: body
            }
          }
        }
      } else if (modelo.accion === 'update') {
        if (modelo.validar.validar) {
          const validation = await validate(modelo.request, modelo.validar.datos)
          if (validation.fails()) {
            return {
              error: true,
              msg: 'La Validacion Fallo'
            }
          } else {
            let data = modelo.requestOnly
            console.log(modelo.unique_key.value, 'valu')
            body = await Modelo.where('_id', modelo.unique_key.value).update(data)
            return {
              error: false,
              body: body
            }
          }
        }
      } else if (modelo.accion === 'index') {
        let data = (await Modelo.all()).toJSON()
        return data
      } else if (modelo.accion === 'show') {
        let data = (await Modelo.query().where(modelo.unique_key.field, modelo.unique_key.value).first()).toJSON()
        return data
      } else if (modelo.accion === 'delete') {
        let data = (await Modelo.find(modelo.unique_key.value)).delete()
        return data
      }
      return 'retornar'
    }
