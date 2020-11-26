'use strict'

/*
|--------------------------------------------------------------------------
| PlanSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Plan = use("App/Models/Plan")
const planData = [
  {
    id: 1,
    name: 'Premium VIP',
    offers: [
      {name: 'Posicionamiento de tu anuncio en primeros.', id: 1},
      {name: 'Avisos instantaneos por email.', id: 2},
      {name: 'No sugerimos empresas de la competencia en tu ficha.', id: 3},
      {name: 'Sugerir tu empresa en perfiles de tu competencia.', id: 4},
      {name: 'Puedes publicaren el blog.', id: 5},
      {name: 'Subir hasta 50 imágenes 2 videos.', id: 6}
    ],
    price: 10
  },
  {
    id: 2,
    name: 'Premium',
    offers: [
      {name: 'Posicionamiento de tu anuncio detrás del plan Premium VIP.', id: 7},
      {name: 'Avisos instantáneos por email.', id: 8},
      {name: 'No sugerimos empresas de la competencia en tu ficha.', id:9},
      {name: 'Sugerir tu empresa en perfiles de tu competencia.', id:10},
      {name: 'Subir hasta 35 imágenes.', id:11}
    ],
    price: 20
  },
  {
    id: 3,
    name: 'Básico',
    offers: [
      {name: 'Posicionamiento reducido.', id: 12},
      {name: 'Avisos instantáneos por email.', id:13},
      {name: 'Subir hasta 20 imágenes.', id:14},
      {name: 'Sugerimos empresas de la competencia en tu ficha.', id:15}
    ],
    price: 30
  }
]

class PlanSeeder {
  async run() {
    for (let i in planData) {
      let plan = await Plan.findBy('id', planData[i].id)
      if (!plan) {
        await Plan.create(planData[i])
      } else {
        plan.name = planData[i].name
        plan.id = planData[i].id
        plan.offers = planData[i].offers
        plan.price = planData[i].price
        await plan.save()
      }
    }
    console.log('Finished Planes')
  }
}

module.exports = PlanSeeder
