const Mail = use('Mail')

exports.sendMail = async (to, subject, message, attach, cc, bcc) => {
  try {
    await Mail.raw(message, (msg) => {
      console.log(msg,'test')
      msg.from('team@heventapp.com', 'Hevent')
      msg.to(to)
      msg.subject(subject)
     // msg.cc('slimedeal@user.com')
      msg.bcc(bcc)
      if (attach) {
        msg.attach(attach)
      }
    })
    return 'Message sent';
  } catch (error) {
    console.log(error, 'Error al Enviar Correo')
  }
}
