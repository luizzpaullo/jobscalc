const express = require('express');
const routes = express.Router();
const basePath = __dirname + '/views/'

const profile = {
    name: 'LuizzP Developer',
    avatar: 'https://avatars.githubusercontent.com/u/40010987?v=4',
    "monthly-budget": 8000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 3
}


routes.get('/',(req, res )=>res.render(basePath + 'index'))
routes.get('/job',(req, res )=>res.render(basePath + 'job'))
routes.get('/job/edit',(req, res )=>res.render(basePath + 'job-edit'))
routes.get('/profile',(req, res )=>res.render(basePath + 'profile',{profile}))


module.exports = routes;