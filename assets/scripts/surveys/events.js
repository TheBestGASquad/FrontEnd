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
  console.log('on update fired')
  console.log('event: ' + event)
  console.log('this: ' + this)
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  console.log(surveyId)
  const data = getFormFields(event.target)
  api.update(surveyId, data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

// event to return all questions associated with this survey
// const onSurveyQuestions = function (event) {
//   event.preventDefault()
//   const surveyId = $(this).attr('surveyId')
//   api.surveyQuestions(surveyId)
//     .then(ui.surveyQuestionSuccess)
//     .catch(ui.surveyQuestionFailure)
// }

const onTakeSurvey = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  api.surveyQuestions(surveyId)
    .then(ui.surveyQuestionSuccess)
    .catch(ui.surveyQuestionFailure)
}

const onAnswerQuestion = function (event) {
  event.preventDefault()
  const id = $(this).attr('questionId')
  let data = $(this).attr('Value')
  data = data === '1'
  api.answerQuestion(data, id)
    .then(ui.answerSuccess)
    .catch(ui.answerFailure)
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
  $('#handlebar-target').on('click', '.delete-auth-survey-button', onDestroy)
  // $('#content').on('click', '.show-questions-button', onGetQuestions)
  // $('#handlebar-target').on('submit', '.update-survey-by-id-form', onUpdate)
  $('#create-survey-nav').on('click', onRevealAddQuestion)
  $('#handlebar-target').on('submit', '#rename-auth-survey-by-id-button', onUpdate)
  $('#handlebar-target').on('click', '.take-survey', onTakeSurvey)
  $('#handlebar-target').on('click', '.answer-question', onAnswerQuestion)
}

module.exports = {
  addHandlers
}
