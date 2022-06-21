require('dotenv').config();
const http = require('http');
const express = require('express'); //chamando a biblioteca express //
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');


const app = express();



// autenticação
const { eAdmin } = require('./middlewares/auth');

// table
const User = require('./models/User');
const Cliente = require('./models/Cliente');
const Agend = require('./models/Agend');

// Bibliotecas
const botscrap = require('./models/botscrap');

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


     const cliente = await Cliente.findOne({
          attributes: ['dt_agenda', 'andamento', 'nome', 'email', 'rg', 'cpf', 'cnpj', 'unidade', 'tipocd', 'hr_agenda', 'formapgto', 'valorcd', 'ct_parcela', 'telefone', 'dtnascimento', 'reg_cnh', 'cei', 'razaosocial', 'validacao', 'referencia', 'comissaoparceiro', 'scp', 'obscont', 'estatos_pgto', 'observacao', 'historico', 'custoCdpar'],
          where: {
               dt_agenda: req.body.dt_agenda,
               cpf: req.body.cpf,
               andamento: req.body.andamento,
               nome: req.body.nome,
               rg: req.body.rg,
               cnpj: req.body.cnpj,
               unidade: req.body.unidade,
               tipocd: req.body.tipocd,
               hr_agenda: req.body.hr_agenda,
               valorcd: req.body.valorcd,
               telefone: req.body.telefone,
               dtnascimento: req.body.dtnascimento,
               razaosocial: req.body.razaosocial,
               obscont: req.body.obscont,
               estatos_pgto: req.body.estatos_pgto,
               observacao: req.body.observacao,

          }

     })
     var dados = req.body;

     await Cliente.create(dados)
          .then(() => {

               return res.json({ error: false, message: 'cliente cadastrado com sucesso!' });

          })

          .catch(err => {
               return res.status(400).json({ error: true, message: 'Erro: Não foi possível cadastrar o usuário!' });
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


const server = http.createServer(app);
server.listen(process.env.PORT || 3040, function () {
     console.log('servidor em execução')
});

