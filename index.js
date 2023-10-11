const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config/swagger.json');
const { mongourl } = require('./config/mongodb');

const artistaRoute = require('./routes/artistaRoute');
const pesquisadoresRoute = require('./routes/pesquisadoresRoute');
const coletivosRoute = require('./routes/coletivosRoute');
const homepageRoute = require('./routes/homepageRoute');
const projectRoute = require('./routes/projetoRoute');
const publicacoesRoute = require('./routes/publicacoesRoute');

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(mongourl('artistas'), { useNewUrlParser: true, useUnifiedTopology: true });
let connection = mongoose.connection;

connection.on('error', (error) => { 
    console.error(`Houve um erro ao carregar o banco de dados: ${error}`);
});

connection.once('open', () => { console.log('Banco de dados conectado com sucesso!') });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/artista', artistaRoute);
app.use('/pesquisadores', pesquisadoresRoute);
app.use('/coletivos', coletivosRoute);
app.use('/homepage', homepageRoute);
app.use('/projeto', projectRoute);
app.use('/publicacoes', publicacoesRoute);

app.listen(port, () => {
    console.log(`Server running on ${port}`)
});