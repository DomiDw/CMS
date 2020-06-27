const express = require('express')
const { join } = require('path')
const Fs = require('fs')
const Jsyaml = require('js-yaml')
const SERVICE_NAME = 'aisw-cms-matchpage'
const DEFAULT_ENVIRONMENT = 'dev'
const app = express()

const IS_FUNCTION = process.env.FUNCTION_SIGNATURE_TYPE || false
// const IS_FUNCTION_LOCAL = !process.env.FUNCTION_SIGNATURE_TYPE

if (process.env.GAE_INSTANCE !== undefined || process.env.FUNCTION_SIGNATURE_TYPE !== undefined) {
  // Activate debug-agent when deployed on cloud only
  require('@google-cloud/debug-agent').start({ allowExpressions: true })
} else {
  // Load environment variables for local testing
  const ConfigFile = Fs.readFileSync(`./${DEFAULT_ENVIRONMENT}.yaml`, 'utf8')
  const Config = Jsyaml.safeLoad(ConfigFile)
  Object.keys(Config).forEach((envVarName) => {
    process.env[envVarName] = Config[envVarName]
  })
  if (!process.env.FUNCTION_REGION) {
    process.env.FUNCTION_REGION = 'eu-west1'
  }
}

app.options('*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'ContentType, content-Type, Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'ContentType, content-Type, Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

// app.use('/', express.static(join(__dirname, 'build')))
app.use(express.static('build'))
app.get('*', (req, res) => {
  const index = join(__dirname, 'build', 'index.html')
  console.log(index)
  res.sendFile(index)
})
const port = process.env.PORT || 8080

if (!IS_FUNCTION) {
  app.listen(port, () => {
    console.log(SERVICE_NAME + ' Listening on', port)
  })
}

exports[SERVICE_NAME] = async (req, res) => {
  return app(req, res)
}
