const express = require('express');
const router = express.Router();
const Incidents = require('./incidentsModel');
const { post } = require('../dsService/dsRouter');
const { validateIncidents } = require('./middleware/index');

// ###Incidents Routes###
router.get('/showallincidents', async (req, res) => {
  try {
    const incidents = await Incidents.getAllIncidents();
    const sources = await Incidents.getAllSources();
    
    const responseArray = []
    
    // Reconstructs the incident object with it's sources to send to front end
    incidents.forEach((incident) => {
      incident['src'] = []
      sources.forEach(source => {
        if(source.incident_id === incident.incident_id) {
          incident.src.push(source)
        }
      })
      responseArray.push(incident)
    })
    res.json(responseArray)
    
  } catch (e) {
    res.status(500).json({ message: 'Request Error' });
  }
});

router.post('/createincidents', validateIncidents, (req, res) => {
  req.body.forEach((incident) => {
    Incidents.createIncident(incident)

      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error creating Record' });
      });
  });
});

// ###Sources Routes###
router.get('/sources', (req, res) => {
  Incidents.getAllSources()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// returns all sources associated with incident ID provided
router.get('/sources/:id', (req, res) => {
  const { id } = req.params;
  Incidents.getSourcesById(id).then((response) => {
    res.json(response);
  });
});

router.post('/createsource', (req, res) => {
  Incidents.createSingleSource(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json(error)
    });
});


// ###Types of Force (tags) Routes###
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
