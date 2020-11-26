'use strict'

/*
|--------------------------------------------------------------------------
| ServicioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Servicio = use("App/Models/Servicio")
const data = [
  {
    id: 1,
    name: 'Servicios'
  },
  {
    id: 2,
    name: 'Locación'
  },
  {
    id: 3,
    name: 'Personal'
  }
]

class ServicioSeeder {
  async run() {
    for (let i in data) {
      let servicio = await Servicio.findBy('id', data[i].id)
      if (!servicio) {
        await Servicio.create(data[i])
      } else {
        servicio.name = data[i].name
        await servicio.save()
      }
    }
    console.log('Finished Servicio Master')
  }
}

module.exports = ServicioSeeder
