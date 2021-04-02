/** 
 * CONFIG SERVIDOR COM EXPRESS
 * -> npm init -y
 * -> npm install express
 * [ ] Criar pasta e arquivo /src/server.js
 **/

const express = require('express')
const server = express()

server.get('/',(req, res )=> {
    console.log('Entrei no index')
})

server.listen(3000, () => console.log('Servidor listening on port 3000'))