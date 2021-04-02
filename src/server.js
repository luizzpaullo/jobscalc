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
 *  - Criar routes
 *  - Ajustar path dos links profile.html -> /profile
 *  
 * # Template engine EJS 
 * -> npm i ejs
 * Configurando a View engine com EJS no server.js
 *  server.ser('view engine','ejs')
 * - renomear arquivos profile.html para profile.ejs
 * - note que como renomeamos os arquivo precisamos refaturar o routes.js
 * - o EJS ira renderizar os html 
 * ajusta: routes.get('/',(req, res)=>res.sendFile(basePath + '/index.html'))   para    : routes.get('/',(req, res)=>res.render(basePath + 'index'))
 * 
 * 
 **/

const express = require('express')
const server = express()
const routes = require('./routes')

// Configurando a View engine com EJS
server.set('view engine','ejs')

/**
 * Habilitar arquivos Statics
 */
server.use(express.static('public'))

//Routes
server.use(routes)

server.listen(3000, () => console.log('Servidor listening on port 3000'))