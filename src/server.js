/** 
 * CONFIG SERVIDOR COM EXPRESS
 * -> npm init -y
 * -> npm install express
 * [ ] Criar pasta /src
 *                      /server.js
 *                      /views/  todos os html aqui
 * 
 **/

const express = require('express')
const server = express()


/**
 * Habilitar arquivos Statics
 */
server.use(express.static('public'))

server.get('/',(req, res )=> {
    // console.log(__dirname)
    return res.sendFile(__dirname + '/views/index.html')
})

server.listen(3000, () => console.log('Servidor listening on port 3000'))