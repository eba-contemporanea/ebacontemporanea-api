const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./config/swagger.json')
const artistaRoute = require('./routes/artistaRoute');
const cors = require('cors');

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.get('/artistas', (req, res) => {
    res.send('artistas todos')
})

app.use('/artista', artistaRoute);

app.get('/pesquisadores', (req, res) => {
    res.send('pesquisadores! :)')
})

app.use(cors());

app.listen(3000, () => {
    console.log('Server running on port 3000')
})