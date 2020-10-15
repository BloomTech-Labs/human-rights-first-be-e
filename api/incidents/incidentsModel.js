const db = require('../../data/db-config');

module.exports = {
  getAllIncidents,
  createIncident,
  getAllSources,
};

function getAllIncidents() {
  return db('incidents');
}

async function createIncident(incident) {
  console.log('createIncident -> incident', incident);
  const newIncident = {
    ds_uuid: incident[0].ds_uuid,
    city: incident[0].city,
    state: incident[0].state,
    title: incident[0].title,
    lat: incident[0].lat,
    long: incident[0].long,
    desc: incident[0].desc,
    date: incident[0].date,
  };
  const incidentID = await db('incidents').insert(newIncident, 'incident_id');
  await db('sources').insert(incident[0].src);
}

function getAllSources() {
  return db('sources');
}
