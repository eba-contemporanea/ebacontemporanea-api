const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config/swagger.json');
const artistaRoute = require('./routes/artistaRoute');
const { mongourl, databases } = require('./config/mongodb');

const app = express();
const port = process.env.PORT || 3000;

let currentDb = databases.artistas;

mongoose.connect(mongourl(currentDb), {useNewUrlParser: true,useUnifiedTopology: true});
let connection = mongoose.connection;

connection.on('error', (error) => { console.error(`Houve um erro ao carregar o banco de dados: ${error}`) });

connection.once('open', () => { console.log('Banco de dados conectado com sucesso!') });

app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
app.get('/artistas', (req, res) => {
    res.send('artistas todos')
})
app.use('/artista', artistaRoute);
app.get('/pesquisadores', (req, res) => {
    res.send('pesquisadores! :)')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})