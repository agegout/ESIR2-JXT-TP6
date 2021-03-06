const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const alertsRouter = require('./routes/alerts')

const app = express()

app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele
app.use('/v1/alerts', alertsRouter)

// For unit tests
exports.app = app