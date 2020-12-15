'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login");
    Route.post("register", "UserController.register")
    Route.post("registrar_cliente", "UserController.registrarCliente")
    Route.get("validate_email/:email", "UserController.validateEmail")
    Route.get("plans", "PlanController.index")
    Route.post("registrar_proveedor", "UserController.registrarProveedor")

    ////////////////////////PAISES////////////////////////////
    Route.get("countries", "CountryController.index")
    /////////////////////////////////////////////////////////

    ///////////SERVICIOS Y PREGUNTAS////////////////
    Route.get("servicios", "ServicioController.index")
    Route.post("preguntas", "ServicioController.preguntasPorCheck")
    Route.put("preguntas", "ServicioController.update")

    Route.get("file_proveedor/:file", "UploadController.getFileByDirectory")
    Route.get("file_proveedor_video/:file", "UploadController.getFileByDirectoryVideo")
    Route.delete("eliminar_archivo_proveedor/:file", "UploadController.eliminarArchivo")

    Route.delete("eliminar_archivo_proveedor_video/:file", "UploadController.eliminarArchivo")
    Route.get("test_file/:file", "UploadController.testFile")
    Route.get("file_proveedor/:carpeta/:id", "UploadController.traerImagenPortadaPerfilProveedor")

  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí

    /////////////Imagenes///////////////////
    //Route.post('subirImagenes', 'UploadController.uploadShopImage');
    ///////////////////////////////

    ///////////PROVEEDORES/////////////////////
    Route.get('proveedores', 'ProveedorController.index')
    Route.get('proveedores_perfil', 'ProveedorController.show')
    Route.post('proveedores', 'ProveedorController.store')
    Route.get('proveedores_servicios/:id_servicio', 'ServicioController.preguntasPorId')
    Route.get('preguntas_proveedor', 'ServicioController.preguntasPorId')
    Route.get('servicios_proveedor', 'ServicioController.preguntasPorProveedor')
    Route.get('obtener_check_servicios_perfil/:id_proveedor', 'ServicioController.obtenerCheckServiciosPerfil')
    ///////////PROVEEDORES/////////////////////

    ///////////Usuarios/////////////////////
    Route.get('users_perfil', 'UserController.show')
    Route.put('editar_datos_proveedor', 'UserController.editarDatosProveedor')
    Route.post('guardar_descripcion_proveedor', 'UserController.guardarDescripcionProveedor')
    Route.put('users_perfil', 'UserController.update')
    Route.get("show_provider_for_user/:id", "ProveedorController.showProviderForUser")
    Route.get("user_info", "UserController.userInfo") // metodo para obtener informacion del usuario que esta logueado

    //rutas para cotizaciones
    Route.get("create_cotization/:id_proveedor/:id_event", "CotisationController.store")
    Route.post("enviar_cotizacion/:id", "CotisationController.enviarCotizacion")
    Route.get("show_all_info_cotization/:id_cotisation", "CotisationController.showAllInfoCotisation")
    Route.get("get_chats", "CotisationController.getChat") //obtiene todas los chats
    Route.post("add_detail_services/:id_cotisation", "CotisationController.addDetailServices") //agrega los detalles del servicio a la cotizacion
    Route.get("show_detail_service_by_id/:id_cotisation/:id_service", "CotisationController.showDetailServiceById") //agrega los detalles del servicio a la cotizacion
    Route.get("get_cotisation_in_status", "CotisationController.getCotisationInStatus")
    Route.put("approve_quote/:id", "CotisationController.approveQuote")
    Route.put("desapprove_quote/:id", "CotisationController.desapproveQuote")
    Route.put("pay_quotes/:event_id", "CotisationController.payQuotes")
    Route.get("quotes_by_status_approve", "CotisationController.quotesByStatusApprove")
    Route.get("cotisations_by_event/:event_id", "CotisationController.cotisationsByEvent")
    Route.get("get_cotisacion_by_id/:id", "CotisationController.getCotisacionById")
    ////////// EVENTOS ////////////////////
    Route.get("events", "CotisationController.getEvents")
    Route.get("event_by_id/:id", "CotisationController.getEventById")
    Route.get("eventos_no_pagados", "EventController.eventosNoPagados")
    Route.post("event", "EventController.store")
    Route.get("event/:id", "EventController.show")
    Route.get("events_by_user", "EventController.index")
    ///////////// EVENTOS ///////////

    /////////////MENSAJES//////////////////////////
    Route.post("send_message/:id_cotisation", "ChatController.store") // metod para enviar un mensaje
    Route.get("show_messages/:id_cotisation", "ChatController.show") // metodo para obtener todos los mensajes de una cotisacion

    Route.post("subir_archivo_proveedor", "UploadController.subirArchivoProveedor")
    Route.post("subir_archivo_proveedor_video", "UploadController.subirArchivoProveedorVideo")
    Route.post("actualizar_file_proveedor/:carpeta", "UploadController.actualizarPortadaPerfilProveedor")

  }).middleware("auth")
);
