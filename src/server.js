/** 
 * CONFIG SERVIDOR COM EXPRESS
 * -> npm init -y
 * -> npm install express
 * [ ] Criar pasta /src
 *                      /server.js
 *                      /views/  todos os html aqui
 * ->npm i nodemon -D 
 * 
 * Editar o package.json 
 *  "main": "src/server.js"
 *  "scripts" : {
 *      "dev":"nodemon ."}
 * 
 *  Para Executar o <Servidor>
 * 
 * -> npm run dev
 * 
 * Organizar estrutura do projetos
 *  criar pasta public na raiz 
 *                 /public/
 *                      public/images/
 *                      public/scripts/
 *                      public/styles
 *  # Criar arquivos routes.js na src
 * 
 **/

const express = require('express')
const server = express()
const routes = require('./routes')


/**
 * Habilitar arquivos Statics
 */
server.use(express.static('public'))

//Routes
server.use(routes)

server.listen(3000, () => console.log('Servidor listening on port 3000'))