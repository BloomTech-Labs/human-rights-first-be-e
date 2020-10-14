const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const { post } = require('../dsService/dsRouter');

router.get('/showallincidents', (req, res) => {
  Incidents.getAllIncidents()
    .then((incidents) => {
      res.json(incidents);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Request Error' });
    });
});

router.post('/incidents', (req, res) => {
  Incidents.createIncident(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error creating Record' });
    });
});

module.exports = router;
