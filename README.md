# NPR API

## Descrição

API construída em Node.js com uma estrutura de pastas no modelo MVC (Model-View-Controller) para maior controle da estrutura e possíveis melhorias futuras.

## Banco de Dados

Banco de dados relacional escolhido foi MySQL com o ORM Sequelize no Node para realizar as operações necessárias no sistema.

## Testes

JEST e SUPERTEST serão as ferramentas utilizadas para criar testes unitários no sistema, verificando a integridade do sistema e seus possíveis casos.

Para testar as requisições preferencialmente utilizar o Postman.

## Funcionalidades

### Usuário (User)

* `createUser` - Cria um usuário
* `deleteUser` - Deleta um usuário baseado no seu id
* `updateUser` - Altera os dados do usuário
* `getAllUsers` - Retorna um json com todos os usuários cadastrados
* `getUserById` - Retorna um json com um registro único do banco de dados
* `getCollectionPoints` - Retorna os pontos cadastrados pelo usuário

### Empresa (Business)

* `createBusiness` - Cria um registro de empresa
* `deleteBusiness` - Deleta um registro de empresa
* `updateBusiness` - Altera os dados da empresa
* `getAllBusiness` - Retorna um json com todos os registros de empresa
* `getBusinessById` - Retorna um json com os dados da empresa especificada

### Pontos de Coleta (Collection Points)

* `createCollectionPoint` - Cria um ponto de coleta
* `deleteCollectionPoint` - Deleta um ponto de coleta
* `updateCollectionPoint` - Altera os dados de um ponto de coleta
* `getAllCollectionPoints` - Retorna um json com todos os pontos de coleta
* `getCollectionPointByType` - Retorna um json com os pontos baseado no tipo

### Categorias (Category)

A princípio a tabela categoria não terá um CRUD incluído, isso se dá à uma tabela auxiliar que terá valores definidos pelo sistema, não podendo ser alterada por fora.

## Autenticação

Ainda estou estudando sobre questões de segurança com hash de senhas e tokens, por enquanto não há criptografia em dados sensíveis.

## Entidades

### User

* `id` - string - primary key
* `name` - string
* `password` - string
* `email` - string (WIP)

O usuário se cadastra através de um formulário que vai para a API e registra seus dados em um banco MySQL utilizando Sequelize.

### Collection Point

* `Id` - int - primary key
* `name` - string
* `business` - string
* `Cep` - string
* `id_category` - foreign key
* `score` - double(1-5)
* `id_user` - foreign key
* `id_business` - foreign key

O ponto de coleta tem como chaves estrangeiras o ID de categoria para especificar o tipo de coleta, e o ID da empresa caso seja representada por uma.

### Business

* `id` - int - primary key
* `name` - string
* `cnpj` - int
* `descricao` - text

Empresas podem se cadastrar no sistema para terem pontos de coletas registrados em seu nome.

### Category

* `id` - int - primary key
* `name` - string

Uma tabela secundária para fazer o controle dos tipos de ponto de coleta baseado em chaves estrangeiras.

## Estrutura de URL

As requisições da API devem seguir os seguintes padrões:

### GET

* Ex: `www.site.com/users/`
    * Output: Json com todos os dados de usuários registrados
* Ex: `www.site.com/businesses/`
    * Output: Json com todas as empresas registradas

Perceba que a url deve se manter com o nome da entidade no plural e em minúsculos e o mesmo deve ser feito para as demais requisições.

### POST

* Ex: `www.site.com/users?id=2`
    * Output: Json com um único registro de usuário com o id especificado
* Ex: `www.site.com/businesses?id=42`
    * Output: Json com o registro da empresa com o id 42

Assim como as requisições GET, se mantem o nome da entidade como caminho para requisição, a única mudança será nas rotas onde serão especificadas os tipos de requisição.

## MER - Modelo de Entidade e Relacionamento

<img src="./public/mer.JPG"/>