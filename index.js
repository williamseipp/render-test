const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

// heres all the stuff about the exercises {{{
// 3.7 use morgan middleware for logging
// 3.8 configure morgan to show data sent with HTTP POST requests

// 3.9 asks you to connect the phonebook frontend with the backend
// q: what is the 'backend'
//
// 3.10 deploy the backend to the internet, like Fly.io or Render
// test the backend with a browser and Postman
// create a README.md at the root of the repo and a link
// to your online application to it


// 3.11 generate a production build of your front end
// and add it to the internet application using the method introduced

// make sure the frontend still works locally in development mode 
// when started with the command `npm run dev`

//
// }}}

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = note.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Jello is great !</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
