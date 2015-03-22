express = require('express')
app = module.exports = express()

app.use '/', express.static('dist')
app.use '/components', express.static('components')
