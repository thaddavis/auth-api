const express = require('express')
const morgan = require('morgan')
const { connectToDb } = require('./db/connect')
// const tanks = require('./routes/tanks');
const accounts = require('./routes/auth');
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// --- --- --- --- --- --- --- --- --- 

const app = express()
const port = process.env.PORT

app.use(cors(corsOptions))
app.use(morgan('combined'))
app.use(express.json());

connectToDb()

app.get('/auth-api', (req, res) => {
  res.send('OK')
})

// app.use('/tanks', authenticateToken, tanks)
app.use('/auth-api', accounts)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send()
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})