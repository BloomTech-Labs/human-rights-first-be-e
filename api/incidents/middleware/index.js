const db = require('../../../data/db-config');

module.exports = {
  validateIncidents,
};

function validateIncidents(req, res, next) {
  req.body = req.body.filter((incident) => {
    if (
      incident.lat &&
      incident.long &&
      incident.city &&
      incident.ds_uuid &&
      incident.state &&
      incident.title &&
      incident.desc &&
      incident.date
    ) {
      const uuid = db('incidents').where('ds_uuid', incident.ds_uuid);
      if (!uuid[0]) return incident;
    }
  });
  next();
}
