
const routes = [
  { path: '/registro', component: () => import('pages/Registro.vue') },
  { path: '/registro_proveedor', component: () => import('pages/RegistroProveedor.vue') },
  { path: '/test', component: () => import('pages/Test.vue') },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { toolbar: true, title: 'Inicio', footer: true },
    children: [
      {
        path: '/evento/:id',
        component: () => import('pages/client/BuscarProveedores.vue'),
        meta: { toolbar: true, title: 'Organiza tu Evento', footer: true }
      },
      {
        path: '/mensajes/:id',
        component: () => import('pages/client/MensajesClientes.vue'),
        meta: { toolbar: true, title: 'Organiza tu Evento', footer: true }
      },
      {
        path: '/revista',
        component: () => import('pages/client/Revista.vue'),
        meta: { toolbar: false, title: 'Seccion Revista', footer: true }
      },
      {
        path: '/inicio_cliente',
        component: () => import('pages/client/new/Inicio.vue'),
        meta: { toolbar: false, title: 'Mi Evento', footer: true }
      },
      {
        path: '/mi_evento/:id',
        component: () => import('pages/client/new/Evento.vue'),
        meta: { toolbar: false, title: 'Mi Evento', footer: true }
      },
      {
        path: '/proveedores/:id',
        component: () => import('pages/client/Proveedores.vue'),
        meta: { toolbar: true, title: 'Organiza tu Evento', footer: true }
      },
      {
        path: '/inicio_proveedor',
        component: () => import('pages/proveedor/Inicio.vue'),
        meta: { toolbar: false, title: 'Hevent', footer: true }
      },
      {
        path: '/perfil_proveedor',
        component: () => import('pages/proveedor/Perfil.vue'),
        meta: { toolbar: true, title: 'Mi Perfil', footer: true }
      },
      {
        path: '/chats_proveedor',
        component: () => import('pages/proveedor/Chats.vue'),
        meta: { toolbar: false, footer: true }
      },
      {
        path: '/proveedor/:header/:id',
        component: () => import('pages/client/InfoProveedor.vue'),
        meta: { toolbar: false, title: 'Hevent', footer: false }
      },
      {
        path: '/chat/:id',
        component: () => import('pages/client/Chat.vue'),
        meta: { toolbar: false, title: 'Organiza tu Evento', footer: false }
      },
      {
        path: '/aprobacion_cotizacion',
        component: () => import('pages/cotizacion/ListadoAprobacion.vue'),
        meta: { toolbar: false, title: 'Cotizaciones', footer: true }
      },
      {
        path: '/calendario_eventos',
        component: () => import('pages/proveedor/Calendario2.vue'),
        meta: { toolbar: true, title: 'Calendario', footer: true }
      },
      {
        path: '/pagar/:id_event',
        component: () => import('pages/client/Pago.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: false }
      },
      {
        path: '/ver_mas_servicios',
        component: () => import('pages/TiposServicio.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: true }
      },
      {
        path: '/editar_anuncio',
        component: () => import('pages/proveedor/EditarAnuncio.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/slider',
    component: () => import('pages/Inicio/Slider.vue')
  },
  {
    path: '/',
    redirect: '/slider'
  },
  {
    path: '*',
    redirect: '/login'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
