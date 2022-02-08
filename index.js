const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./config/swagger.json')
const artistaRoute = require('./routes/artistaRoute');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.get('/artistas', (req, res) => {
    res.send('artistas todos')
})

app.use('/artista', artistaRoute);

app.get('/pesquisadores', (req, res) => {
    res.send('pesquisadores! :)')
})

app.use(cors());

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})