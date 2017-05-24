'use strict'

const store = require('../store.js')
const api = require('./api.js')
const showSurveyHB = require('../surveyHandlebars.handlebars')
const showQuestionHB = require('../questionsHandlebars.handlebars')
const showUserSurveyHB = require('../authUserHandlebars.handlebars')

const createSurveySuccess = (response) => {
  store.surveyID = response.survey.id
  const showQuestionHtml = showQuestionHB({ questions: store.userSurveys })
  $('form#create-survey').hide()
  $('form#create-question').show()
  $('#content').append(showQuestionHtml)
  console.log('store.surveyID' + store.surveyID)
  console.log('success')
  console.log(response)
}

const createSurveyFailure = (error) => {
  console.log('failed to create')
  console.log(error)
}

const createQuestionSuccess = (response) => {
  console.log('success')
  console.log(response)
}

const refreshTable = () => {
  const showSurveyHtml = showSurveyHB({ surveys: store.userSurveys })
  console.log('refresh')
  $('#content').empty()
  $('#content').append(showSurveyHtml)
}

const refreshSurveyList = () => {
  const showUserSurveyHtml = showUserSurveyHB({ surveys: store.userSurveys })
  console.log('refresh')
  $('#auth-user-content').empty()
  $('#auth-user-content').append(showUserSurveyHtml)
}

const userMessage = (txt) => {
  const message = $('#message')[0]
  $(message).text(txt)
  setTimeout(function () { $('#message').text('') }, 2000)
}

const indexOfSurveysSuccess = (data) => {
  if (data.userSurveys.length === 0) {
    userMessage('You have no surveys created.')
  }
  store.userSurveys = data.surveys
  refreshTable()
}

const indexOfSurveysFailure = (surveyId) => {
  store.userSurveys = surveyId.surveys
  console.log('failed to index')
}

const showAuthUserSurveysSuccess = (data) => {
  console.log('show user survey fired', data)
  store.userSurveys = data.surveys
  refreshSurveyList()
}

const showAuthUserSurveysFailure = (data) => {
  console.log('failed to show user surveys', data)
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
  console.log(surveyId)
  console.log('successful update')
  refreshTable()
  api.indexOfSurveys()
    .then(indexOfSurveysSuccess)
    .catch(indexOfSurveysFailure)
}

const updateFailure = (data) => {
}

module.exports = {
  createSurveySuccess,
  createSurveyFailure,
  createQuestionSuccess,
  indexOfSurveysSuccess,
  indexOfSurveysFailure,
  destroySuccess,
  destroyFailure,
  updateSuccess,
  updateFailure,
  refreshTable,
  showAuthUserSurveysSuccess,
  showAuthUserSurveysFailure
}
