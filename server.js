require('dotenv').config();
const http = require('http');
const express = require('express'); //chamando a biblioteca express //
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();



// autenticação
const { eAdmin } = require('./middlewares/auth');

// table
const User = require('./models/User');
const Cliente = require('./models/Cliente');
const Agend = require('./models/Agend');
const Conex = require('./models/Conex');

// Bibliotecas
const botscrap = require('./models/botscrap2');

// retorno em Json

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// usuario
app.get('/totem/:id', async (req, res, next) => {
     // app.get('/usuario', async (req, res, next) => {

     const usuario = await User.findOne({
          attributes: ['idagrv', 'nome', 'cpf', 'nascimento', 'rg', 'logradouro', 'numero', 'complemento', 'cep', 'municipio', 'uf', 'bairro', 'whatsapp', 'email', 'chavepix', 'tipopix', 'numeropolo', 'a1pj_12m', 'a3pj_36m', 'a1pf_12m', 'a3pf_36m'],
          where: {
               idagrv: req.params.id,

          },
     })
          .then((usuario) => {
               res.json(usuario)
               console.log(usuario)
          })
          .catch((err) => {
               console.log(err)
          })
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// create cliente


app.post('/cadastrar/cliente', async (req, res) => {
     var dados = req.body;
     await Cliente.create(dados)
          .then(() => {
               return res.status(200).json({message: 'cliente cadastrado com sucesso!' });
          })
          .catch(err => {
               return res.status(400).json({message: 'Erro: Não foi possível cadastrar o usuário!' });
          });
});

app.get('/roboscrap/:cnpj', async (req, res) => {

     const cnpj = req.params.cnpj;
     const response = await botscrap(cnpj);
     res.json(response);

});

app.get('/calendar', async (req, res) => {

     const calendar = await Agend.findAll({
          attributes: ['id', 'data', 'dia_semana', 'feriado'],
     })
          .then((calendar) => {
               res.json(calendar)
               console.log(calendar)
          })
          .catch((err) => {
               console.log(err)
          })

});


app.get('/teste/conexao', async (req, res) => {

     const conex = await Conex.findAll({
          attributes: ['id', 'msg'],
     })
          .then((conex) => {
               res.json(conex)
               console.log(conex)
          })
          .catch((err) => {
               console.log(err)
          })
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3040, function () {
     console.log('servidor em execução')
});

