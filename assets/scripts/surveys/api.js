'use strict'

const config = require('../config.js')
const store = require('../store.js')

const create = (data) => {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const indexOfSurveys = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const destroy = function (surveyId) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = (surveyId, data) => {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId, // now its a 400 error
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  create,
  update,
  indexOfSurveys,
  destroy
}
