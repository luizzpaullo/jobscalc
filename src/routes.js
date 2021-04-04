const express = require('express');
const routes = express.Router();
const basePath = __dirname + '/views/'

const Profile = {
    data: {
        name: 'LuizzP Developer',
        avatar: 'https://avatars.githubusercontent.com/u/40010987?v=4',
        "monthly-budget": 100000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res){
            return res.render(basePath + "profile",{ profile: Profile.data })
        },

        update(req, res) {
                // req.body p/ pegar os dados
                const data = req.body

                // definir qts semanas tem num ano: 52
                const weeksPerYear = 52

                // remover ferias p/ pegar semanas no mes de trabalho
                const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

                // total de horas trabalhadas na semana
                const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

                // horas trabalhadas no mes 
                const monthlyTotalHours = weekTotalHours * weeksPerMonth

                // Valor da Hora
                const valueHour= data["monthly-budget"] / monthlyTotalHours

                Profile.data = {
                    ...Profile.data,
                    ...req.body,
                    "value-hour": valueHour
                }

                return res.redirect('/profile')
        }

        
    }
}

const Job = {
    data: [
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
    ],
    controllers: {
        index(req,res) {
            const updatedJobs = Job.data.map((job) => {
                // Ajustes no Job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                 return {
                     ...job,
                     remaining,
                     status,
                     budget: Profile.data['value-hour'] * job['total-hours']
        
                 }
            })
            
            return res.render(basePath + 'index',{jobs: updatedJobs})
        },

        create (req, res ) {
            return res.render(basePath + 'job')
        },

        save(req, res ){
            // req.body => { name: 'Arte ', 'daily-hours': '5', 'total-hours': '25' }
            
                const lastId = Job.data[Job.data.length - 1]?.id || 1;
            
                Job.data.push({
                   id: lastId + 1,
                   name: req.body.name,
                   'daily-hours': req.body['daily-hours'],
                   'total-hours': req.body['total-hours'],
                   created_at: Date.now()
            
               })
            
               return res.redirect('/')
            
            }
    },
    services: {
        remainingDays(job) {
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
    }
}




routes.get('/', Job.controllers.index)
routes.get('/job',Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit',(req, res )=>res.render(basePath + 'job-edit'))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;