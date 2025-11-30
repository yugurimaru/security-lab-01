const mysql = require('mysql');
const validator = require('validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Configurações de segurança
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições
});
app.use(limiter);

// Configuração segura do banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'testdb'
});

// CORRIGIDO: Usando prepared statements (previne SQL Injection)
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  
  // Validar entrada
  if (!validator.isInt(userId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  
  // Usar prepared statement
  const query = 'SELECT id, name, email FROM users WHERE id = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro no banco:', err);
      return res.status(500).json({ error: 'Erro interno' });
    }
    res.json(results);
  });
});

// CORRIGIDO: Sanitização de entrada (previne XSS)
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  
  // Validar e sanitizar
  if (!comment || typeof comment !== 'string') {
    return res.status(400).json({ error: 'Comentário inválido' });
  }
  
  // Escapar HTML
  const sanitizedComment = validator.escape(comment);
  
  res.json({ 
    message: 'Comentário recebido',
    comment: sanitizedComment 
  });
});

// REMOVIDO: Endpoint de debug que expunha informações sensíveis
// Substituído por endpoint de health check seguro
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;