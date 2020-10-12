const db = require('../../data/db-config')

module.exports = {
    getAllIncidents,
    createIncident,

}

function getAllIncidents() {
    return db('incidents')
}

function createIncident(incident) {
    return db('incidents').insert(incident)

}