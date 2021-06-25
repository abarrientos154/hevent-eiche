'use strict'

/*
|--------------------------------------------------------------------------
| BlogSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Blog = use("App/Models/Blog")
const data = [
  {
    id: 1,
    titulo: 'Esto es un titulo',
    categoria: 'Bodas',
    subtitulo: 'Esto es un subtitulo lorem ipsu dolor',
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore veniam ducimus id quam, adipisci eligendi consectetur quos deleniti eos et cumque inventore, nobis a corporis ex, vitae animi iste.
    `,
    descriptionTwo: `
      2Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore veniam ducimus id quam, adipisci eligendi consectetur quos deleniti eos et cumque inventore, nobis a corporis ex, vitae animi iste.
      2Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti magni quod facilis corporis ducimus! Quidem in at voluptatum! Adipisci illum modi nobis tempore optio tempora earum animi error quod minima?
    `,
    imgs: ['example_5.jpg', 'example_5.jpg', 'example_5.jpg'],
    img: 'example_5.jpg',
    autor: 'Nombre Autor'
  }
]

class BlogSeeder {
  async run () {
    for (let i in data) {
      let search = await Blog.findBy('id', data[i].id)
      if (!search) {
        await Blog.create(data[i])
      } else {
        await Blog.query().where('id', data[i].id).update(data[i])
      }
    }
    console.log('Finished Blogs')
  }
}

module.exports = BlogSeeder
