'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('create survey data: ' + data)
  api.createSurvey(data)
    .then(ui.createSurveySuccess)
    .catch(ui.createSurveyFailure)
}

const onCreateQuestion = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
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
  const userId = $(this).attr('userId')
  console.log(userId)
  api.showAuthUserSurveys(userId)
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

// event to return all questions associated with this survey
const onSurveyQuestions = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  api.surveyQuestions(surveyId)
    .then(ui.surveyQuestionSuccess)
    .catch(ui.surveyQuestionFailure)
}

const onRevealAddQuestion = function (event) {
  console.log('events')
  $('form#create-survey').show()
}

const addHandlers = () => {
  $('#create-survey').on('submit', onCreateSurvey)
  $('#create-question').on('submit', onCreateQuestion)
  $('#indexOfSurveys').on('click', onIndexOfSurveys)
  $('#show-auth-user-surveys').on('click', onShowAuthUserSurveys)
  $('#create-survey-nav').on('click', onRevealAddQuestion)
  $('#auth-user-content').on('click', '.delete-survey-button', onDestroy)
  // $('#content').on('click', '.show-questions-button', onGetQuestions)
<<<<<<< HEAD
  $('#auth-user-content').on('submit', '.update-survey-by-id-form', onUpdate)
=======
  $('#content').on('submit', '.update-survey-by-id-form', onUpdate)
  $('#content').on('click', '.view-questions-button', onSurveyQuestions)
>>>>>>> View Survey button fires surveyQuestion API call
  $('#create-survey-nav').on('click', onRevealAddQuestion)
}

module.exports = {
  addHandlers
}
