# Matheus Alves Torres
## Bussiness Case DHL – Analista de Processos (Digitalização)

## Aplicativo de Gerenciamento de Cargas Logístico – Empresa XYZ

### Descrição do Projeto

O aplicativo facilita o gerenciamento de cargas e funcionários de forma eficiente, onde os apontadores/balançeiros/conferentes irão utilizar para fazerem o registro de entrada/saída de cargas e caminhões como também conforme a operação acontece, poderão editar em qual parte do armazém/planta essa carga se encontra. Aqui você encontrará todas as informações necessárias para entender e usar a aplicação.

### O que o aplicativo/sistema faz?

#### Página de Login
Na página de login, você pode acessar o sistema usando seu nome de usuário e senha. É aqui que começa sua jornada no sistema de Gerenciamento de Cargas Logístico – Empresa XYZ.

#### Página de Cadastro de Usuário
Nessa página podemos adicionar novos usuários ao sistema, assim permitindo a navegação completa do site. É bem simples: preencha os campos necessários e crie o usuário!

#### Página de Listagem de Funcionários
Nesta página, você vê todos as cargas e descargas cadastradas. Pode editar, excluir ou apenas visualizar suas informações, assim mantemos tudo organizado.
- Operações de CRUD:
  - Criação (Create): Adicionar novas cargas de entrada/saída ao sistema.
  - Leitura (Read): Visualizar os detalhes de cada carga e descarga listada.
  - Atualização (Update): Editar informações de cargas e descargas existentes.
  - Exclusão (Delete): Remover cargas e descargas do sistema.

#### Página de Detalhes de Carga
Veja detalhes específicos de uma carga selecionada. É uma forma rápida de conferir todas as informações importantes.
- Operações de CRUD:
  - Leitura (Read): Visualizar os detalhes específicos da carga selecionada.

#### Página de Cadastro de Carga
Adicione novas cargas ao sistema aqui. Preencha os detalhes e salve.
- Operações de CRUD:
  - Criação (Create): Adicionar novas cargas ao sistema.

#### Página de Edição de Carga
Esta página permite editar qualquer informação da carga selecionada de forma simples e dinâmica.
- Operações de CRUD:
  - Leitura (Read): Visualizar os detalhes da carga selecionada.
  - Atualização (Update): Editar informações da carga selecionada.

#### Página de Gerenciamento de Logins
Aqui os administradores podem visualizar, editar ou excluir contas de usuário. É importante para manter o controle de quem acessa o sistema.
- Operações de CRUD:
  - Leitura (Read): Visualizar os detalhes de cada usuário.
  - Atualização (Update): Editar informações de usuários existentes.
  - Exclusão (Delete): Remover usuários do sistema.

### Tecnologias Utilizadas
- Front-end: Usamos React.js e React Router para criar a interface do usuário.
- Back-end: Utilizamos o JSON Server e Bootstrap para garantir um design moderno e responsivo.
- Estado da Aplicação: Utilizei o React Hooks como useState e useEffect para gerenciar o estado da aplicação e simular uma API RESTful.
- Estilização: Usei o Bootstrap para garantir um design moderno e responsivo.
- Integração com API: Utilizei a Fetch API do JavaScript para interagir com a API simulada.

### Configurando e Executando a Aplicação

1. Clone o Repositório
   Primeiro, faça uma cópia do nosso projeto no seu computador:

2. Instale as Dependências
   Certifique-se de ter o Node.js instalado. Em seguida, instale as dependências necessárias:

3. Configure o JSON Server
   Instale o JSON Server globalmente ou localmente no projeto. Crie um arquivo `db.json` na raiz do projeto com os dados necessários.
   
4. Execute a Aplicação
   Inicie o JSON Server para simular a API & Inicie a aplicação React. Em seguida, Abra seu navegador e acesse http://localhost:3000 & caso queira visualizar os dados, acesse o json-server http://localhost:8000/employee & http://localhost:8000/users para começar a usar o Aplicativo/Sistema de Gerenciamento Logistico – Empresa XYZ.
   