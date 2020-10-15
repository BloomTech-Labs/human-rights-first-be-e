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
  const newIncident = {
    ds_uuid: incident.ds_uuid,
    city: incident.city,
    state: incident.state,
    title: incident.title,
    lat: incident.lat,
    long: incident.long,
    desc: incident.desc,
    date: incident.date,
  };
  const incidentID = await db('incidents').insert(newIncident, 'incident_id');
  await createSource(incident.src, incidentID);
  await createTags(incident.tags, incidentID);
  return { message: 'Success!' };
}

async function createTags(tags, incidentID) {
  await tags.forEach(async (tag) => {
    console.log('createTags -> tag', tag);
    const tof = await createTypeOfForce(tag);
    await createIncidentTypeOfForce(incidentID, tof);
  });
}

async function createSource(sources, incidentID) {
  await sources.forEach(async (sourceURL) => {
    console.log('createIncident -> sourceURL', sourceURL);
    const source = {
      incident_id: incidentID,
      src_url: sourceURL,
    };
    await db('sources').insert(source);
  });
}

async function createTypeOfForce(tof) {
  const forceType = await db('type_of_force').where(tof, 'type_of_force');
  console.log('createTypeOfForce -> forceType', forceType);
  if (!forceType) {
    forceType.type_of_force_id = await db('type_of_force').insert(
      tof,
      'type_of_force_id'
    );
  }
  return forceType;
}

async function createIncidentTypeOfForce(incident_id, type_of_force_id) {
  console.log('createIncidentTypeOfForce');
  await db('incident_type_of_force').insert({ incident_id, type_of_force_id });
}

function getAllSources() {
  return db('sources');
}
