'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('create survey data: ' + data)
  api.createSurvey(data)
    .then(ui.createSurveySuccess)
    .catch(ui.createSurveyFailure)
}

const onCreateQuestion = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createQuestion(data)
    .then(ui.createQuestionSuccess)
    .catch(ui.createQuestionFailure)
}

const onIndexOfSurveys = function (event) {
  event.preventDefault()
  api.indexOfSurveys()
    .then(ui.indexOfSurveysSuccess)
    .catch(ui.indexOfSurveysFailure)
}

const onShowAuthUserSurveys = function (event) {
  event.preventDefault()
  api.showAuthUserSurveys()
  .then(ui.showAuthUserSurveysSuccess)
  .catch(ui.showAuthUserSurveysFailure)
}

const onDestroy = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  api.destroy(surveyId)
    .then(ui.destroySuccess)
    .catch(ui.destroyFailure)
}

const onUpdate = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  const data = getFormFields(event.target)
  api.update(surveyId, data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onRevealAddQuestion = function (event) {
  console.log('events')
  $('form#create-survey').show()
}

const addHandlers = () => {
  $('#create-survey').on('submit', onCreateSurvey)
  $('#create-question').on('submit', onCreateQuestion)
  $('#indexOfSurveys').on('click', onIndexOfSurveys)
  $('#show-auth-user-surveys').on('submit', onShowAuthUserSurveys)
  $('#create-survey-nav').on('click', onRevealAddQuestion)
  $('#content').on('click', '.delete-survey-button', onDestroy)
  // $('#content').on('click', '.show-questions-button', onGetQuestions)
  $('#content').on('submit', '.update-survey-by-id-form', onUpdate)
  $('#create-survey-nav').on('click', onRevealAddQuestion)
}

module.exports = {
  addHandlers
}
