'use strict'
const store = require('../store.js')
const showSurveysHB = require('../surveyHandlebars.handlebars')
const api = require('./api.js')

const store = require('../store.js')
const api = require('./api.js')
const showSurveyHB = require('../surveyHandlebars.handlebars')

const refreshTable = () => {
  const showSurveyHtml = showSurveyHB({ surveys: store.userSurveys })
  console.log('refresh')
  $('#content').empty()
  $('#content').append(showSurveyHtml)

}

const userMessage = (txt) => {
  const message = $('#message')[0]
  $(message).text(txt)
  setTimeout(function () { $('#message').text('') }, 2000)
}

const createSuccess = (data) => {
  console.log('create success')
  store.userSurveys = data.surveys
  refreshTable()
  $('input').val('')
  console.log(data)
}


const createFailure = (data) => {
  console.log(data, 'failed to create')
}

const indexOfSurveysSuccess = (data) => {
  if (data.surveys.length === 0) {
    userMessage('You have no surveys created.')
  }
  store.userSurveys = data.surveys
  refreshTable()

}

const indexOfSurveysFailure = (surveyId) => {
  store.userSurveys = surveyId.surveys
  console.log('failed to index')
}

const showOneSurveySuccess = (data) => {
  console.log('success')
  console.log(data)
  if (data.surveys.length === 0) {
    userMessage('You have no surveys.')
  }
  store.userSurveys = data.surveys
  refreshTable()
}


const showFailure = () => {
  console.log('failed to show')
  store.userSurveys = surveyId.surveys
}

const destroySuccess = () => {
  refreshTable()
  api.indexOfSurveys()
    .then(indexOfSurveysSuccess)
    .catch(indexOfSurveysFailure)
  console.log('successful deletion')
}

const destroyFailure = (data) => {
  console.log('deletion failed')
}

const updateSuccess = (surveyId) => {
  store.userSurveys = surveyId.surveys

  console.log(surveyId)
  console.log('successful update')
  refreshTable()
  api.indexOfSurveys()
    .then(indexOfSurveysSuccess)
    .catch(indexOfSurveysFailure)
}

const updateFailure = (data) => {
  store.userSurveys = data.surveys
}

module.exports = {
  createSuccess,
  createFailure,
  indexOfSurveysSuccess,
  indexOfSurveysFailure,
  showSuccess,
  showFailure,
  destroySuccess,
  destroyFailure,
  updateSuccess,
  updateFailure,
  refreshTable
}
