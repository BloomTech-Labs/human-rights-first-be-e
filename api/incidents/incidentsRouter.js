const express = require('express')
const router = express.Router()
const Incidents = require('./incidentsModel')
router.get('/incidents', (req, res) => {
    Incidents.getAllIncidents().then(incidents => {
        res.json(incidents)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Request Error'})
    })
})

router.post('/incidents', (req, res) => {
    Incidents.createIncident(req.body).then(incidents => {
        res.json({message:'Record created'})
    })
    .catch(err => {
        res.status(500).json({message:'Error creating Record'})
    })
})

module.exports = router