const { getAvailableLetters } = require('./getAvailableLetters');
const { getStudyTypes } = require('./getStudyTypes');
const { validateRequest } = require('./validateRequests');

module.exports = {
    getStudyTypes,
    getAvailableLetters,
    validateRequest
}