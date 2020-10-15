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
      return incident;
    }
  });
  next();
}
