const express = require('express');
const routes = express.Router();
const basePath = __dirname + '/views/'

const profile = {
    name: 'LuizzP Developer',
    avatar: 'https://avatars.githubusercontent.com/u/40010987?v=4',
    "monthly-budget": 8000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [
    {
        id: 1,
        name: 'Pizzaria Guloso',
        'daily-hours': 2,
        'total-hours': 1,
        created_at: Date.now(),

    },
    {
        id: 2,
        name: 'OneTwo Project',
        'daily-hours': 3,
        'total-hours': 47,
        created_at: Date.now(),

    }
]

function remainingDays(job) {
            //Calcular o tempo de cada job
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
         
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
            
            const timeDiffInMs = dueDateInMs - Date.now()
            //tranformar milisegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)

            //restam X dias
            return dayDiff
}

routes.get('/',(req, res )=>{
    
    const updatedJobs = jobs.map((job) => {
        // Ajustes no Job
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

         return {
             ...job,
             remaining,
             status,
             budget: profile['value-hour'] * job['total-hours']

         }
    })
    
    return res.render(basePath + 'index',{jobs: updatedJobs})

})
routes.get('/job',(req, res )=>res.render(basePath + 'job'))
routes.post('/job',(req, res )=> {
// req.body => { name: 'Arte ', 'daily-hours': '5', 'total-hours': '25' }

    const lastId = jobs[jobs.length - 1]?.id || 1;

   jobs.push({
       id: lastId + 1,
       name: req.body.name,
       'daily-hours': req.body['daily-hours'],
       'total-hours': req.body['total-hours'],
       created_at: Date.now()

   })

   return res.redirect('/')

})
routes.get('/job/edit',(req, res )=>res.render(basePath + 'job-edit'))
routes.get('/profile',(req, res )=>res.render(basePath + 'profile',{profile}))


module.exports = routes;