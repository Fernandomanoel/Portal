import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/javascript-guia-api-rest.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "JavaScript API REST - Guia Completo",
  introducao: "Do básico até production: criando APIs profissionais com Node.js e Express",
  itens: [
    {
      id: "1-fundamentos-de-api-rest",
      titulo: "1. Fundamentos de API REST",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "O que é uma API?",
        },
        {
          tipo: "texto",
          texto: "Uma API (Application Programming Interface) é um conjunto de regras e protocolos que permite que diferentes aplicações se comuniquem. Uma API REST usa o protocolo HTTP para operações CRUD (Create, Read, Update, Delete).",
        },
        {
          tipo: "subtitulo",
          texto: "Princípios REST",
        },
        {
          tipo: "lista",
          itens: [
            "Cliente-Servidor: Separação clara entre cliente e servidor",
            "Stateless: Cada requisição contém todas as informações necessárias",
            "Recursos: Dados são representados como recursos (URLs)",
            "Métodos HTTP: GET, POST, PUT, DELETE, PATCH",
            "Representação: Dados geralmente em JSON",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Métodos HTTP",
        },
        {
          tipo: "tabela",
          colunas: ["Método","Operação","Exemplo"],
          linhas: [
            ["GET","Obter dados (ler)","GET /api/usuarios/1"],
            ["POST","Criar dados","POST /api/usuarios"],
            ["PUT","Atualizar dados completo","PUT /api/usuarios/1"],
            ["PATCH","Atualizar dados parcial","PATCH /api/usuarios/1"],
            ["DELETE","Deletar dados","DELETE /api/usuarios/1"],
          ],
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exemplos de URLs REST",
          texto: "GET /api/usuarios — Lista todos os usuários GET /api/usuarios/123 — Pega usuário com ID 123 POST /api/usuarios — Cria novo usuário PUT /api/usuarios/123 — Atualiza usuário 123 DELETE /api/usuarios/123 — Deleta usuário 123",
        },
        {
          tipo: "subtitulo",
          texto: "Status HTTP",
        },
        {
          tipo: "tabela",
          colunas: ["Código","Significado","Exemplo"],
          linhas: [
            ["200","OK - Sucesso","Dados obtidos com sucesso"],
            ["201","Created - Criado","Novo recurso criado"],
            ["400","Bad Request - Erro do cliente","Dados inválidos enviados"],
            ["404","Not Found - Não encontrado","Recurso não existe"],
            ["500","Server Error - Erro do servidor","Erro interno no servidor"],
          ],
        },
      ],
    },
    {
      id: "2-configuracao-inicial-node-js-e-npm",
      titulo: "2. Configuração Inicial - Node.js e npm",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Instalando Node.js",
        },
        {
          tipo: "lista",
          itens: [
            "Acesse nodejs.org",
            "Baixe a versão LTS (Long Term Support)",
            "Execute o instalador",
            "Verifique a instalação: node --version e npm --version",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Criando seu primeiro projeto",
        },
        {
          tipo: "texto",
          texto: "Abra o terminal no VS Code (Ctrl + `) e execute:",
        },
        {
          tipo: "codigo",
          conteudo: `mkdir minha-api
cd minha-api
npm init -y`,
          rotulo: "Terminal",
        },
        {
          tipo: "texto",
          texto: "Isso criará um arquivo package.json com configurações do projeto.",
        },
        {
          tipo: "subtitulo",
          texto: "Instalando dependências",
        },
        {
          tipo: "texto",
          texto: "Você precisa do Express (framework web) e Nodemon (reinicia servidor automaticamente):",
        },
        {
          tipo: "codigo",
          conteudo: `npm install express
npm install --save-dev nodemon`,
          rotulo: "Terminal",
        },
        {
          tipo: "subtitulo",
          texto: "Configurar script no package.json",
        },
        {
          tipo: "texto",
          texto: "Abra package.json e substitua a linha de \"scripts\" por:",
        },
        {
          tipo: "codigo",
          conteudo: `"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}`,
          rotulo: "package.json",
        },
        {
          tipo: "texto",
          texto: "Seu projeto está pronto! Agora vamos criar o servidor.",
        },
      ],
    },
    {
      id: "3-seu-primeiro-servidor-express",
      titulo: "3. Seu Primeiro Servidor Express",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Criando index.js",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo chamado index.js na raiz do projeto:",
        },
        {
          tipo: "codigo",
          conteudo: `// Importar Express
const express = require('express');

// Criar aplicação
const app = express();

// Middleware: aceitar JSON
app.use(express.json());

// Porta do servidor
const PORT = 3000;

// Rota GET simples
app.get('/api/oi', (req, res) => {
  res.json({ mensagem: 'Olá, API!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(\`Servidor rodando em http://localhost:\${PORT}\`);
});`,
          rotulo: "index.js - Servidor Básico",
        },
        {
          tipo: "subtitulo",
          texto: "Rodando o servidor",
        },
        {
          tipo: "texto",
          texto: "No terminal, execute:",
        },
        {
          tipo: "codigo",
          conteudo: "npm run dev",
          rotulo: "Terminal",
        },
        {
          tipo: "texto",
          texto: "Você verá: Servidor rodando em http://localhost:3000",
        },
        {
          tipo: "subtitulo",
          texto: "Testando a API",
        },
        {
          tipo: "texto",
          texto: "Abra o navegador e acesse: http://localhost:3000/api/oi",
        },
        {
          tipo: "texto",
          texto: "Você verá: {\"mensagem\":\"Olá, API!\"}",
        },
        {
          tipo: "texto",
          texto: "Parabéns! Seu primeiro servidor Express está rodando!",
        },
      ],
    },
    {
      id: "4-rotas-e-parametros",
      titulo: "4. Rotas e Parâmetros",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Diferentes tipos de rotas",
        },
        {
          tipo: "subtitulo",
          texto: "Rota com parâmetro de caminho (path parameter)",
        },
        {
          tipo: "codigo",
          conteudo: `// /:id é um parâmetro
app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.json({ 
    mensagem: \`Usuário com ID: \${id}\`,
    id: id
  });
});`,
          rotulo: "index.js",
        },
        {
          tipo: "texto",
          texto: "Teste: http://localhost:3000/api/usuarios/42",
        },
        {
          tipo: "texto",
          texto: "Resposta: {\"mensagem\":\"Usuário com ID: 42\",\"id\":\"42\"}",
        },
        {
          tipo: "subtitulo",
          texto: "Rota com query string",
        },
        {
          tipo: "codigo",
          conteudo: `// ?nome=João&idade=25
app.get('/api/buscar', (req, res) => {
  const { nome, idade } = req.query;
  res.json({ nome, idade });
});`,
          rotulo: "index.js",
        },
        {
          tipo: "texto",
          texto: "Teste: http://localhost:3000/api/buscar?nome=João&idade=25",
        },
        {
          tipo: "subtitulo",
          texto: "POST - Receber dados no corpo",
        },
        {
          tipo: "codigo",
          conteudo: `app.post('/api/usuarios', (req, res) => {
  const { nome, email } = req.body;
  
  // Validação simples
  if (!nome || !email) {
    return res.status(400).json({ 
      erro: 'Nome e email são obrigatórios' 
    });
  }

  res.status(201).json({ 
    mensagem: 'Usuário criado!',
    usuario: { nome, email }
  });
});`,
          rotulo: "index.js",
        },
        {
          tipo: "texto",
          texto: "Postman",
        },
        {
          tipo: "texto",
          texto: "Insomnia",
        },
        {
          tipo: "texto",
          texto: "curl",
        },
      ],
    },
    {
      id: "5-estrutura-de-dados-banco-em-memoria",
      titulo: "5. Estrutura de Dados - Banco em Memória",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Criar um banco de dados simples em memória",
        },
        {
          tipo: "texto",
          texto: "Para aprender, vamos usar um array para armazenar dados. Depois aprenderemos banco de dados real.",
        },
        {
          tipo: "codigo",
          conteudo: `const express = require('express');
const app = express();

app.use(express.json());

// Simular banco de dados
let usuarios = [
  { id: 1, nome: 'João', email: 'joao@example.com' },
  { id: 2, nome: 'Maria', email: 'maria@example.com' }
];

let proximoId = 3;

// GET - Listar todos
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

// GET - Obter um por ID
app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  res.json(usuario);
});

// POST - Criar novo
app.post('/api/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ 
      erro: 'Nome e email obrigatórios' 
    });
  }

  const novoUsuario = { id: proximoId++, nome, email };
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// PUT - Atualizar
app.put('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  if (req.body.nome) usuario.nome = req.body.nome;
  if (req.body.email) usuario.email = req.body.email;

  res.json(usuario);
});

// DELETE - Deletar
app.delete('/api/usuarios/:id', (req, res) => {
  const indice = usuarios.findIndex(u => u.id === parseInt(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const usuarioDeletado = usuarios.splice(indice, 1);

  res.json({ mensagem: 'Usuário deletado', usuario: usuarioDeletado[0] });
});

app.listen(3000, () => {
  console.log('Servidor em http://localhost:3000');
});`,
          rotulo: "index.js - Com dados em memória",
        },
        {
          tipo: "subtitulo",
          texto: "Testando com curl",
        },
        {
          tipo: "texto",
          texto: "No terminal, teste seus endpoints:",
        },
        {
          tipo: "codigo",
          conteudo: "curl http://localhost:3000/api/usuarios",
          rotulo: "Terminal - Testar GET",
        },
        {
          tipo: "codigo",
          conteudo: `curl -X POST http://localhost:3000/api/usuarios \\
  -H "Content-Type: application/json" \\
  -d '{"nome":"Pedro","email":"pedro@example.com"}'`,
          rotulo: "Terminal - Testar POST",
        },
        {
          tipo: "texto",
          texto: "Agora você tem uma API CRUD completa funcionando!",
        },
      ],
    },
    {
      id: "6-banco-de-dados-mongodb-com-mongoose",
      titulo: "6. Banco de Dados - MongoDB com Mongoose",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Por que usar MongoDB?",
        },
        {
          tipo: "lista",
          itens: [
            "Banco de dados NoSQL (flexível)",
            "Armazena dados em formato JSON",
            "Fácil de usar com JavaScript",
            "Escalável para aplicações grandes",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Instalação",
        },
        {
          tipo: "codigo",
          conteudo: "npm install mongoose",
          rotulo: "Terminal",
        },
        {
          tipo: "subtitulo",
          texto: "Conectar ao MongoDB",
        },
        {
          tipo: "texto",
          texto: "Crie uma conta grátis no MongoDB Atlas",
        },
        {
          tipo: "codigo",
          conteudo: `const mongoose = require('mongoose');

// Conectar ao banco
mongoose.connect('mongodb+srv://usuario:senha@cluster.mongodb.net/meuBanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Erro ao conectar:', err));

// Definir esquema (estrutura)
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  idade: Number,
  dataCriacao: { type: Date, default: Date.now }
});

// Criar modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);`,
          rotulo: "index.js - Com MongoDB",
        },
        {
          tipo: "subtitulo",
          texto: "CRUD com MongoDB",
        },
        {
          tipo: "codigo",
          conteudo: `// GET - Listar todos
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST - Criar
app.post('/api/usuarios', async (req, res) => {
  try {
    const novoUsuario = new Usuario(req.body);
    const usuario = await novoUsuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// PUT - Atualizar
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE - Deletar
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Deletado com sucesso', usuario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});`,
          rotulo: "index.js - Rotas com MongoDB",
        },
        {
          tipo: "texto",
          texto: "async/await",
        },
      ],
    },
    {
      id: "7-middlewares-e-tratamento-de-erros",
      titulo: "7. Middlewares e Tratamento de Erros",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "O que é um Middleware?",
        },
        {
          tipo: "texto",
          texto: "Um middleware é uma função que pode processar requisições e respostas antes de chegar à rota final. Útil para:",
        },
        {
          tipo: "lista",
          itens: ["Validar dados","Autenticação","Logging","Tratamento de erros"],
        },
        {
          tipo: "subtitulo",
          texto: "Middleware simples de logging",
        },
        {
          tipo: "codigo",
          conteudo: `// Middleware que registra todas as requisições
app.use((req, res, next) => {
  const tempo = new Date().toLocaleTimeString();
  console.log(\`[\${tempo}] \${req.method} \${req.path}\`);
  next(); // Continua para próxima função
});`,
          rotulo: "index.js",
        },
        {
          tipo: "subtitulo",
          texto: "Middleware de validação",
        },
        {
          tipo: "codigo",
          conteudo: `// Middleware que valida email
const validarEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^@]+@[^@]+\\.[^@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ erro: 'Email inválido' });
  }

  next();
};

// Usar o middleware em uma rota específica
app.post('/api/usuarios', validarEmail, (req, res) => {
  // Criar usuário...
  res.json({ mensagem: 'Usuário criado' });
});`,
          rotulo: "index.js",
        },
        {
          tipo: "subtitulo",
          texto: "Tratamento global de erros",
        },
        {
          tipo: "codigo",
          conteudo: `// Colocar NO FINAL do arquivo, depois de todas as rotas
app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  res.status(500).json({ 
    erro: err.message || 'Erro interno do servidor'
  });
});`,
          rotulo: "index.js - Middleware de erro",
        },
      ],
    },
    {
      id: "8-autenticacao-com-jwt",
      titulo: "8. Autenticação com JWT",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "O que é JWT?",
        },
        {
          tipo: "texto",
          texto: "JWT (JSON Web Token) é um padrão seguro de autenticação. Permite verificar a identidade do usuário sem armazenar sessões no servidor.",
        },
        {
          tipo: "subtitulo",
          texto: "Instalando dependências",
        },
        {
          tipo: "codigo",
          conteudo: "npm install jsonwebtoken bcryptjs dotenv",
          rotulo: "Terminal",
        },
        {
          tipo: "subtitulo",
          texto: "Criar arquivo .env",
        },
        {
          tipo: "texto",
          texto: "Crie um arquivo .env na raiz do projeto:",
        },
        {
          tipo: "codigo",
          conteudo: `MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meuBanco
JWT_SECRET=sua_chave_super_secreta_aqui
PORT=3000`,
          rotulo: ".env",
        },
        {
          tipo: "subtitulo",
          texto: "Implementar autenticação",
        },
        {
          tipo: "codigo",
          conteudo: `require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware para verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?..split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decodificado.id;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

// Rota de login
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Encontrar usuário
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado' });
    }

    // Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ erro: 'Senha incorreta' });
    }

    // Criar token
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, usuario: { id: usuario._id, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota protegida - só acessa com token válido
app.get('/api/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});`,
          rotulo: "index.js - Autenticação JWT",
        },
        {
          tipo: "texto",
          texto: "Sempre use HTTPS em produção para proteger tokens!",
        },
      ],
    },
    {
      id: "9-organizacao-estrutura-em-pastas",
      titulo: "9. Organização - Estrutura em Pastas",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Estrutura recomendada para APIs maiores",
        },
        {
          tipo: "codigo",
          conteudo: `minha-api/
├── models/
│   └── Usuario.js
├── routes/
│   ├── usuarios.js
│   └── auth.js
├── middlewares/
│   ├── autenticacao.js
│   └── validacao.js
├── controllers/
│   ├── usuarioController.js
│   └── authController.js
├── .env
├── index.js
├── package.json
└── README.md`,
          rotulo: "Estrutura de Pastas",
        },
        {
          tipo: "subtitulo",
          texto: "models/Usuario.js",
        },
        {
          tipo: "codigo",
          conteudo: `const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);`,
          rotulo: "models/Usuario.js",
        },
        {
          tipo: "subtitulo",
          texto: "routes/usuarios.js",
        },
        {
          tipo: "codigo",
          conteudo: `const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/autenticacao');

router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obterUsuario);
router.post('/', usuarioController.criarUsuario);
router.put('/:id', verificarToken, usuarioController.atualizarUsuario);
router.delete('/:id', verificarToken, usuarioController.deletarUsuario);

module.exports = router;`,
          rotulo: "routes/usuarios.js",
        },
        {
          tipo: "subtitulo",
          texto: "controllers/usuarioController.js",
        },
        {
          tipo: "codigo",
          conteudo: `const Usuario = require('../models/Usuario');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const novoUsuario = new Usuario(req.body);
    const usuario = await novoUsuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};`,
          rotulo: "controllers/usuarioController.js",
        },
        {
          tipo: "subtitulo",
          texto: "index.js - Usando as rotas",
        },
        {
          tipo: "codigo",
          conteudo: `require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());

// Conectar ao banco
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Erro no banco:', err));

// Importar rotas
const usuariosRoutes = require('./routes/usuarios');

// Usar rotas
app.use('/api/usuarios', usuariosRoutes);

// Iniciar servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(\`Servidor em porta \${process.env.PORT || 3000}\`);
});`,
          rotulo: "index.js - Versão limpa",
        },
      ],
    },
    {
      id: "10-deploy-colocando-a-api-em-producao",
      titulo: "10. Deploy - Colocando a API em Produção",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Opções de Deploy",
        },
        {
          tipo: "lista",
          itens: [
            "Heroku: Gratuito, fácil (deixou de ser 100% grátis)",
            "Railway: Alternativa ao Heroku, gratuita",
            "Render: Fácil e gratuito",
            "AWS/Google Cloud: Profissional e escalável",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Deploy no Render (recomendado)",
        },
        {
          tipo: "lista",
          itens: [
            "Crie conta em render.com",
            "Conecte seu repositório GitHub",
            "Clique em \"New\" → \"Web Service\"",
            "Selecione seu repositório",
            "Configure:",
            "— Build Command: npm install",
            "— Start Command: npm start",
            "Adicione variáveis de ambiente (.env)",
            "Deploy automático ao fazer push no Git",
          ],
          numerada: true,
        },
        {
          tipo: "subtitulo",
          texto: "Preparar para produção",
        },
        {
          tipo: "texto",
          texto: "Adicione no seu package.json:",
        },
        {
          tipo: "codigo",
          conteudo: `"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
},
"engines": {
  "node": "18.x"
}`,
          rotulo: "package.json",
        },
        {
          tipo: "subtitulo",
          texto: "Checklist de produção",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "✓ Antes de fazer deploy:",
          texto: "",
          itens: [
            "HTTPS configurado",
            "Variáveis sensíveis em .env",
            "Tratamento de erros implementado",
            "Autenticação JWT funcionando",
            "CORS configurado (se necessário)",
            "Rate limiting implementado",
            "Logs configurados",
            "Testes automatizados",
            ".env não committed no Git",
            "Banco de dados em produção",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Configurar CORS",
        },
        {
          tipo: "codigo",
          conteudo: `const cors = require('cors');

app.use(cors({
  origin: 'https://meu-frontend.vercel.app',
  credentials: true
}));`,
          rotulo: "index.js - CORS",
        },
        {
          tipo: "texto",
          texto: "Primeiro instale: npm install cors",
        },
      ],
    },
    {
      id: "11-testes-automatizados",
      titulo: "11. Testes Automatizados",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Instalando Jest (framework de testes)",
        },
        {
          tipo: "codigo",
          conteudo: "npm install --save-dev jest supertest",
          rotulo: "Terminal",
        },
        {
          tipo: "subtitulo",
          texto: "Exemplo de teste",
        },
        {
          tipo: "codigo",
          conteudo: `const request = require('supertest');
const app = require('../index');

describe('GET /api/usuarios', () => {
  it('deve retornar lista de usuários', async () => {
    const res = await request(app)
      .get('/api/usuarios');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/usuarios', () => {
  it('deve criar novo usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Test User',
        email: 'test@example.com'
      });
    
    expect(res.statusCode).toBe(201);
  });
});`,
          rotulo: "__tests__/usuarios.test.js",
        },
        {
          tipo: "subtitulo",
          texto: "Rodar testes",
        },
        {
          tipo: "codigo",
          conteudo: "npm test",
          rotulo: "Terminal",
        },
      ],
    },
    {
      id: "12-recursos-avancados-e-melhores-praticas",
      titulo: "12. Recursos Avançados e Melhores Práticas",
      blocos: [
        {
          tipo: "subtitulo",
          texto: "Paginação",
        },
        {
          tipo: "codigo",
          conteudo: `app.get('/api/usuarios', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const usuarios = await Usuario.find()
    .skip(skip)
    .limit(limit);

  const total = await Usuario.countDocuments();

  res.json({
    usuarios,
    paginaAtual: page,
    totalPaginas: Math.ceil(total / limit),
    total
  });
});`,
          rotulo: "index.js - Paginação",
        },
        {
          tipo: "subtitulo",
          texto: "Busca e filtro",
        },
        {
          tipo: "codigo",
          conteudo: `app.get('/api/usuarios/busca', async (req, res) => {
  const { nome } = req.query;

  const usuarios = await Usuario.find({
    nome: { $regex: nome, $options: 'i' } // Case-insensitive
  });

  res.json(usuarios);
});`,
          rotulo: "index.js - Busca",
        },
        {
          tipo: "subtitulo",
          texto: "Rate Limiting (proteção contra ataques)",
        },
        {
          tipo: "codigo",
          conteudo: "npm install express-rate-limit",
          rotulo: "Terminal",
        },
        {
          tipo: "codigo",
          conteudo: `const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requisições
});

app.use('/api/', limiter);`,
          rotulo: "index.js - Rate Limit",
        },
        {
          tipo: "subtitulo",
          texto: "Validação com Joi",
        },
        {
          tipo: "codigo",
          conteudo: "npm install joi",
          rotulo: "Terminal",
        },
        {
          tipo: "codigo",
          conteudo: `const Joi = require('joi');

const schema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  idade: Joi.number().min(18)
});

app.post('/api/usuarios', (req, res) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ erro: error.details[0].message });
  }

  // Criar usuário...
});`,
          rotulo: "index.js - Validação Joi",
        },
        {
          tipo: "subtitulo",
          texto: "Documentação com Swagger",
        },
        {
          tipo: "codigo",
          conteudo: "npm install swagger-jsdoc swagger-ui-express",
          rotulo: "Terminal",
        },
        {
          tipo: "codigo",
          conteudo: `const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));`,
          rotulo: "index.js - Swagger Setup",
        },
        {
          tipo: "texto",
          texto: "Acesse: http://localhost:3000/api-docs",
        },
      ],
    },
  ],
};

export default atividade;
