const escape = require('escape-html')
const express = require('express')
const handlebars = require('express-handlebars')

const routes = require('./routes')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


module.exports = http

const members = new Set()

app.engine('hbs', handlebars({
  defaultLayout: 'main.hbs',
  extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', routes.getIndex)

// Handle new connection
io.on('connection', socket => {

  // socket.on('character selected', character => {
  //   members.add(character)
  // })

  // Handle recieving message from client
  socket.on('boosh message', message => {

    // TODO Store message in database.

    // Send the message to all connected clients
    io.emit('boosh message', {
      avatar: escape(message.avatar),
      character: escape(message.character),
      text: escape(message.text)
    })
  })
})

// io.on('disconnect', function () {
//
//   clients
//
//   membersChanged()
//
// })
//
// function membersChanged() {
//
//   const members = Array.from(clients.values())
//
//   io.emit('members changed', {
//     members
//   })
// }
