const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser); // Use bodyParser para processar dados do corpo da requisição

// Middleware para modificar o comportamento de geração de IDs
server.use((req, res, next) => {
    if (req.method === 'POST') {
        const db = router.db; // Obtém o objeto de banco de dados do router
        const employees = db.get('employee'); // Obtém a coleção 'employee' do banco de dados
        const lastEmployee = employees.value().slice(-1)[0]; // Obtém a última carga na coleção

        // Verifica se há cargas no banco de dados
        if (lastEmployee) {
            // Gera o próximo ID como o último ID + 1
            req.body.id = lastEmployee.id + 1;
        } else {
            // Se não houver cargas, define o ID como 1
            req.body.id = 1;
        }
    }
    // Continue para o próximo middleware
    next();
});

// Middleware para retornar os detalhes de uma carga específica
server.get('/employee/:empid', (req, res) => {
    const empid = parseInt(req.params.empid); // Converte o empid para número inteiro
    const db = router.db; // Obtém o objeto de banco de dados do router
    const employees = db.get('employee'); // Obtém a coleção 'employee' do banco de dados
    const empDetail = employees.find({ id: empid }).value(); // Busca a carga pelo ID

    if (empDetail) {
        res.json(empDetail);
    } else {
        res.status(404).json({ error: 'carga não encontrada' });
    }
});

server.use(middlewares);
server.use(router);

server.listen(8000, () => {
    console.log('JSON Server is running');
});