'use strict'

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const User = use('App/Models/User')
const fs = require('fs')
var randomize = require('randomatic');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  async upload({
    request
  }) {
    let data = {}
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    var profilePic = request.file('files', {
      types: ['image'],
      size: '2mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: dat.identification + '-' + dat.name,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      data.name = profilePic.fileName

      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    profilePic = request.file('files2', {
      types: ['image'],
      size: '2mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: dat.identification + '- license -' + dat.name,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      data.license = profilePic.fileName
      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    profilePic = request.file('files3', {
      types: ['image'],
      size: '2mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: dat.identification + '- identification -' + dat.name + '.' + profilePic.extname,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      data.identification = profilePic.fileName
      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    return data
  }
  async getFile({
    params,
    response
  }) {
    const fileName = params.filename
    return fileName
    response.download(Helpers.appRoot('storage/uploads') + `/${fileName}`)
  }

  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async subirArchivoProveedor ({ request, response, auth }) {
    let codeFile = randomize('Aa0', 30)
    let user = await auth.getUser()
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/proveedor_images')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/proveedor_images'), {
          name: codeFile,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let proveedor = await User.find(user._id)
        if (proveedor.images) {
          proveedor.images.push(codeFile)
        } else {
          proveedor.images = []
          proveedor.images.push(codeFile)
        }
        await proveedor.save()
        console.log(proveedor, 'proveedor buscar')
        response.send(proveedor)
      }
    }
  }

  async subirArchivoProveedorVideo ({ request, response, auth }) {
    let codeFile = randomize('Aa0', 30)
    let user = await auth.getUser()
    var profilePic = request.file('files', {
      size: '250mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/proveedor_videos')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/proveedor_videos'), {
          name: codeFile,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let proveedor = await User.find(user._id)
        if (proveedor.videos) {
          proveedor.videos.push(codeFile)
        } else {
          proveedor.videos = []
          proveedor.videos.push(codeFile)
        }
        await proveedor.save()
        console.log(proveedor, 'proveedor buscar')
        response.send(proveedor)
      }
    }
  }

  async uploadShopImage ({ auth, request }) {
    let user = await auth.getUser()
    let shop_id = request.input('shop_id')
    let shop = await Shop.find(shop_id)
    let dir = `storage/uploads/user_${user._id}/shop_${shop_id}/logo`
    let showingDir = `user_${ user._id }-shop_${shop_id}-logo`

    if (!shop) {
      response.unprocessableEntity('El comercio no existe. Vuelva a cargar el formulario')
    }

    const shopImage = request.file('files', {
      types: ['image'],
      size: '2mb'
    })
    let fileName = `${new Date().getTime()}.${shopImage.subtype}`
    await shopImage.move(Helpers.appRoot(dir), {
      name: fileName,
      overwrite: true
    })
    if (!shopImage.moved()) {
      return shopImage.error()
    }
    if (shop.fileName) {
      fs.unlinkSync(Helpers.appRoot(`storage/uploads/${shop.fileName.split('-').join('/')}`))
    }
    shop.fileName = `${showingDir}-${fileName}`
    await shop.save()
    return shop.fileName
  }

  /* async getFileByDirectory ({ params, response, request }) {
    const dir = params.dir.split('-').join('/')
    response.download(Helpers.appRoot('storage/uploads') + `/${dir}`)
  } */

  async getFileByDirectory({ params, response, request }) {
    const dir = params.file
    console.log(dir,'here')
    response.download(Helpers.appRoot('storage/uploads/proveedor_images') + `/${dir}`)
  }

  async getFileByDirectoryVideo({ params, response, request }) {
    const dir = params.file
    console.log(dir,'here')
    response.download(Helpers.appRoot('storage/uploads/proveedor_videos') + `/${dir}`)
  }

  async testFile({ params, response, request }) {
    response.download(Helpers.appRoot('storage/uploads/proveedor_videos/' + params.file))
  }

  async eliminarArchivo ({ params, response, auth }) {
    const dir = params.file
    await fs.unlinkSync(Helpers.appRoot(`storage/uploads/proveedor_images/${dir}`))
    let user = await auth.getUser()
    let provider = await User.find(user._id)
    let i = provider.images.indexOf(dir)
    provider.images.splice(i, 1)
    await provider.save()
    response.send(provider)
  }

  async eliminarArchivoVideo ({ params, response, auth }) {
    const dir = params.file
    await fs.unlinkSync(Helpers.appRoot(`storage/uploads/proveedor_videos/${dir}`))
    let user = await auth.getUser()
    let provider = await User.find(user._id)
    let i = provider.videos.indexOf(dir)
    provider.videos.splice(i, 1)
    await provider.save()
    response.send(provider)
  }

  async traerImagenPortadaPerfilProveedor ({response, params}) {
    response.download(Helpers.appRoot(`storage/uploads/register/${params.carpeta}${params.id}`))
  }

  async actualizarPortadaPerfilProveedor ({response, params, auth, request}) {
    let user = await auth.getUser()
    var profilePic = request.file('files', {
      size: '250mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/register')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/register'), {
          name: `${params.carpeta}${user._id}`,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    response.send(profilePic)
  }

}

module.exports = UploadController
