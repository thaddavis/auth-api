const express = require('express')
const morgan = require('morgan')
const { connectToDb } = require('./db/connect')
// const tanks = require('./routes/tanks');
const accounts = require('./routes/auth');


// --- --- --- --- --- --- --- --- --- 

const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.json());

connectToDb()

app.get('/', (req, res) => {
  res.send('OK')
})

// app.use('/tanks', authenticateToken, tanks)
app.use('/', accounts)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send()
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})