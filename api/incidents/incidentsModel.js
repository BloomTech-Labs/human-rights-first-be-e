const db = require('../../data/db-config');

module.exports = {
  getAllIncidents,
  createIncident,
  getAllSources,
  getAllTags,
  getAllTagTypes,
};

function getAllIncidents() {
  // return db('incidents').select('*').join('sources', 'incidents.incident_id', 'sources.incident_id' )
  return db('incidents')
}

async function createIncident(incident) {
  const newIncident = {
    id: incident.id,
    city: incident.city,
    state: incident.state,
    title: incident.title,
    lat: incident.lat,
    long: incident.long,
    desc: incident.desc,
    date: incident.date,
  };
  const incidentID = await db('incidents').insert(newIncident, 'incident_id');
  await createSource(incident.src, incidentID[0]);
  await createTags(incident.tags, incidentID[0]);
  return { message: 'Success!' };
}

async function createTags(tags, incidentID) {
  await tags.forEach(async (tag) => {
    const tof = await createTypeOfForce({ type_of_force: tag });
    console.log('createTags -> tof', tof);
    await createIncidentTypeOfForce(incidentID, tof.type_of_force_id);
  });
}

async function createSource(sources, incidentID) {
  await sources.forEach(async (sourceURL) => {
    const source = {
      incident_id: incidentID,
      src_url: sourceURL,
    };
    await db('sources').insert(source);
  });
}

async function createTypeOfForce(tof) {
  const forceType = await db('type_of_force').where(
    'type_of_force',
    tof.type_of_force
  );
  if (!forceType[0]) {
    forceType[0].type_of_force_id = await db('type_of_force').insert(
      { type_of_force: tof.type_of_force },
      'type_of_force_id'
    );
  }
  return forceType[0];
}

async function createIncidentTypeOfForce(incident_id, type_of_force_id) {
  console.log('createIncidentTypeOfForce');
  await db('incident_type_of_force').insert({
    incident_id: incident_id,
    type_of_force_id: type_of_force_id,
  });
}

function getAllSources() {
  return db('sources');
}

function getAllTags() {
  return db('type_of_force');
}

function getAllTagTypes() {
  return db('incident_type_of_force');
}
