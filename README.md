# Documentação da API NPR (Núcleo de Pontos de Recolhimento)

## 1. Introdução

Esta documentação descreve as rotas da API e os modelos de dados do projeto NPR, um sistema para gerenciar pontos de recolhimento de materiais recicláveis.

## 2. Modelos de Dados

* **User (Usuário)**
    * `id` (Integer, Primary Key, Auto Increment)
    * `name` (String, Not Null)
    * `password` (String, Not Null)
    * `email` (String, Not Null)
* **Business (Empresa)**
    * `id` (Integer, Primary Key, Auto Increment)
    * `name` (String, Not Null)
    * `password` (String, Not Null)
    * `cnpj` (String, Not Null)
    * `description` (String, Not Null)
* **CollectionPoint (Ponto de Recolhimento)**
    * `id` (Integer, Primary Key, Auto Increment)
    * `name` (String, Not Null)
    * `business_name` (String, Not Null)
    * `cep` (String, Not Null)
    * `score` (Decimal(10, 2), Not Null, Default 0.00)
    * `id_user` (Integer, Not Null, Foreign Key: User.id)
    * `id_business` (Integer, Nullable, Foreign Key: Business.id)
    * `id_category` (Integer, Not Null, Foreign Key: Category.id)
* **Category (Categoria)**
    * `id` (Integer, Primary Key, Auto Increment)
    * `name` (String, Not Null)

## 3. Rotas da API

### User (Usuário)

* `GET /api/user`
    * Descrição: Retorna todos os usuários ou um usuário específico por ID (via query param `id`).
    * Resposta: JSON com a lista de usuários ou um único usuário.
* `GET /api/user/collectionPoints?id={userId}`
    * Descrição: Retorna todos os pontos de coleta de um usuário específico.
    * Resposta: JSON com a lista de pontos de coleta.
* `POST /api/user`
    * Descrição: Cria um novo usuário.
    * Corpo da requisição: JSON com `name`, `password` e `email`.
    * Resposta: JSON com o usuário criado.
* `POST /api/user/login`
    * Descrição: Verifica as credenciais do usuário e retorna um token de autenticação.
    * Corpo da requisição: JSON com `email` e `password`.
    * Resposta: JSON com a mensagem de sucesso e o token.
* `DELETE /api/user`
    * Descrição: Deleta um usuário por ID (via corpo da requisição `id`).
    * Resposta: JSON com mensagem de sucesso.
* `PUT /api/user`
    * Descrição: Atualiza um usuário por ID (via corpo da requisição `id`).
    * Corpo da requisição: JSON com `id`, `name`, `password` e `email`.
    * Resposta: JSON com o usuário atualizado.

### Business (Empresa)

* `GET /api/business`
    * Descrição: Retorna todas as empresas ou uma empresa específica por ID (via query param `id`).
    * Resposta: JSON com a lista de empresas ou uma única empresa.
* `POST /api/business`
    * Descrição: Cria uma nova empresa.
    * Corpo da requisição: JSON com `name`, `password`, `cnpj` e `description`.
    * Resposta: JSON com a empresa criada.
* `DELETE /api/business`
    * Descrição: Deleta uma empresa por ID (via corpo da requisição `id`).
    * Resposta: JSON com mensagem de sucesso.
* `PUT /api/business`
    * Descrição: Atualiza uma empresa por ID (via corpo da requisição `id`).
    * Corpo da requisição: JSON com `id`, `name`, `cnpj` e `description`.
    * Resposta: JSON com a empresa atualizada.

### CollectionPoint (Ponto de Recolhimento)

* `GET /api/collectionPoint`
    * Descrição: Retorna todos os pontos de coleta ou pontos de coleta por categoria (via query param `type`).
    * Resposta: JSON com a lista de pontos de coleta.
* `POST /api/collectionPoint`
    * Descrição: Cria um novo ponto de coleta.
    * Corpo da requisição: JSON com `name`, `business_name`, `cep`, `score`, `id_user`, `id_business` e `id_category`.
    * Resposta: JSON com o ponto de coleta criado.
* `DELETE /api/collectionPoint`
    * Descrição: Deleta um ponto de coleta por ID (via query param `id`).
    * Resposta: JSON com mensagem de sucesso.
* `PUT /api/collectionPoint`
    * Descrição: Atualiza um ponto de coleta por ID (via corpo da requisição `id`).
    * Corpo da requisição: JSON com `id`, `name`, `business_name` e `cep`.
    * Resposta: JSON com o ponto de coleta atualizado.

### Category (Categoria)

* `GET /api/category`
    * Descrição: Retorna todas as categorias.
    * Resposta: JSON com a lista de categorias.

## 4. Autenticação

A autenticação é feita através da rota `POST /api/user/login`. Após o login, um token de autenticação é retornado. Este token deve ser incluído no cabeçalho `Authorization` das requisições subsequentes para acessar rotas protegidas. (Implementar JWT)

## 5. Tratamento de Erros

A API retorna códigos de status HTTP para indicar o resultado das requisições. Em caso de erro, um JSON com a mensagem de erro é retornado.

## 6. Considerações Finais

Esta documentação é um ponto de partida. À medida que o projeto evolui, a documentação deve ser atualizada para refletir as mudanças na API e nos modelos de dados.