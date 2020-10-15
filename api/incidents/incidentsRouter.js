const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const { post } = require('../dsService/dsRouter');
const { validateIncidents } = require('./middleware/index');

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

router.post('/incidents', validateIncidents, (req, res) => {
  Incidents.createIncident(req.body)

    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error creating Record' });
    });
});

router.get('/sources', (req, res) => {
  console.log('res', res);
  Incidents.getAllSources()
    .then((res) => {
      res.status(201).json(res);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
