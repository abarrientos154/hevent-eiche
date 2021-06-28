'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')
const Blog = use('App/Models/Blog')

/**
 * Resourceful controller for interacting with blogs
 */
class BlogController {
  /**
   * Show a list of all blogs.
   * GET blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    let blogs = (await Blog.query().where({}).fetch()).toJSON()
    let blogsType = {
      consejos: [],
      ideas: [],
      articulos: []
    }
    for (let j of blogs) {
      if (j.tipo === 1) { // consejos
        blogsType.consejos.push(j)
      } else if (j.tipo === 2) { //ideas
        blogsType.ideas.push(j)
      } else if (j.tipo === 3) { //articulos
        blogsType.articulos.push(j)
      }
    }
    response.send(blogsType)
  }

  async indexAll ({ response }) {
    let blogs = (await Blog.query().where({}).fetch()).toJSON()
    response.send(blogs)
  }

  async showImg ({ response, params }) {
    const dir = params.file
    console.log(dir,'here')
    response.download(Helpers.appRoot('public/blogs/' + params.id) + `/${dir}`)
  }

  /**
   * Render a form to be used for creating a new blog.
   * GET blogs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new blog.
   * POST blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single blog.
   * GET blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let data = await Blog.find(params.id)
    response.send(data)
  }

  /**
   * Render a form to update an existing blog.
   * GET blogs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update blog details.
   * PUT or PATCH blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a blog with id.
   * DELETE blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = BlogController
