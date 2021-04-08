const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    //criando variáveis para receber a resposta do Model
    //  NAO PODE PEGAR NADA DO MODEL ELE DEVE DISPONIBILIZAR.
    const jobs = Job.get();
    const profile = Profile.get();

    const updatedJobs = jobs.map((job) => {
      // Ajustes no Job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    return res.render("index", { jobs: updatedJobs });
  }
}
