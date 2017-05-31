'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
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
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  const data = getFormFields(event.target)
  api.update(surveyId, data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onRevealAddQuestion = function (event) {
  $('form#create-survey').show()
  $('#handlebar-target').text('')
}

const takeSurvey = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  api.surveyQuestions(surveyId)
   .then(ui.takeSurveySuccess)
   .catch(ui.takeSurveyFailure)
}

const onSurveyQuestions = function (event) {
  event.preventDefault()
  const surveyId = $(this).attr('surveyId')
  api.surveyQuestions(surveyId)
   .then(ui.surveyQuestionsSuccess)
   .catch(ui.surveyQuestionsFailure)
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

const onGetQuestionData = function (event) {
  const id = $(this).attr('questionId')
  api.getQuestionData(id)
    .then(ui.getQuestionDataSuccess)
    .catch(ui.getQuestionDataFailure)
}

const onDeleteQuestion = function (event) {
  event.preventDefault()
  const id = $(this).attr('questionId')
  api.onDeleteQuestion(id)
    .then(ui.deleteQuestionSuccess)
    .catch(ui.deleteQuestionFailure)
}

const addHandlers = () => {
  $('#create-survey').on('submit', onCreateSurvey)
  $('#create-question').on('submit', onCreateQuestion)
  $('#indexOfSurveys').on('click', onIndexOfSurveys)
  $('#indexOfUserSurveys').on('click', onShowAuthUserSurveys)
  $('#create-survey-nav').on('click', onRevealAddQuestion)
  $('#handlebar-target').on('click', '.delete-auth-survey-button', onDestroy)
  // $('#content').on('click', '.show-questions-button', onGetQuestions)
  // $('#handlebar-target').on('submit', '.update-survey-by-id-form', onUpdate)
  // $('#create-survey-nav').on('click', onRevealAddQuestion)
  $('#handlebar-target').on('submit', '.update-survey', onUpdate)
  $('handlebar-target').on('click', '.view-questions-button')
  $('#handlebar-target').on('click', '.take-survey', takeSurvey)
  $('#handlebar-target').on('click', '.answer-question', onAnswerQuestion)
  $('#handlebar-target').on('click', '.view-questions-button', onSurveyQuestions)
  $('#handlebar-target').on('click', '.get-data', onGetQuestionData)
  $('#handlebar-target').on('click', '.delete-question-button', onDeleteQuestion)
  $('#content').on('click', '.delete-question-button', onDeleteQuestion)
}

module.exports = {
  addHandlers
}
