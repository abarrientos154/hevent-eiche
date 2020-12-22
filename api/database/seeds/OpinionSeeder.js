'use strict'

/*
|--------------------------------------------------------------------------
| OpinionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Opinion = use("App/Models/Opinion")
const data = [
  {
    id: 1,
    user_id: '5e90d6e6f75366526a680092',
    comentario: "It doesn't have a lot to choose from, if you want to make something a little formal, you can't. This app only really does weddings and birthdays, and baby showers, if I were you, I would get a different app",
    puntuacion: 4,
    proveedor_id: '5fdbe307e3725c0b4cab7be1'
  }
]

class OpinionSeeder {
  async run () {
    for (let i in data) {
      let opinion = await Opinion.findBy('id', data[i].id)
      if (!opinion) {
        await Opinion.create(data[i])
      } else {
        await Opinion.query().where('id', data[i].id).update(data[i])
      }
    }
    console.log('Finished Opiniones')
  }
}

module.exports = OpinionSeeder
