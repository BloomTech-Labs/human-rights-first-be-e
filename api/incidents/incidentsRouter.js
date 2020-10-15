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

router.post('/createincidents', validateIncidents, (req, res) => {
  req.body.forEach((incident) => {
    console.log('incident', incident);
    Incidents.createIncident(incident)

      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Error creating Record' });
      });
  });
});

router.get('/sources', (req, res) => {
  Incidents.getAllSources()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/tags', (req, res) => {
  Incidents.getAllTags()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/tagtypes', (req, res) => {
  Incidents.getAllTagTypes()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
