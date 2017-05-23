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

const onIndex = function (event) {
  event.preventDefault()
  api.index()
    .then(ui.indexSuccess)
    .catch(ui.indexFailure)
}

const onUserIndex = function (event) {
  event.preventDefault()
  api.userIndex()
    .then(ui.userIndexSuccess)
    .catch(ui.userIndexFailure)
}

const onSurveyQuestions = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data.survey.id)
  api.surveyQuestions(data.survey.id)
    .then(ui.surveyQuestionSuccess)
    .catch(ui.surveyQuestionFailure)
}

const onShow = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.show(data.survey.id)
    .then(ui.showSuccess)
    .catch(ui.showFailure)
}

const onDestroy = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.destroy(data.survey.id)
    .then(ui.destroySuccess)
    .catch(ui.destroyFailure)
}

const onUpdate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  const id = data.survey.id
  api.update(data, id)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onAnswerQuestion = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  const id = data.question.id
  data = data.question.results === '1'
  console.log(data)
  api.answerQuestion(data, id)
    .then(ui.answerSuccess)
    .catch(ui.answerFailure)
}

const addHandlers = () => {
  $('.create-survey').on('submit', onCreateSurvey)
  $('.create-question').on('submit', onCreateQuestion)
  $('.index').on('click', onIndex)
  $('.user-index').on('click', onUserIndex)
  $('.show').on('submit', onShow)
  $('.destroy').on('submit', onDestroy)
  $('.update').on('submit', onUpdate)
  $('.answer-question').on('submit', onAnswerQuestion)
  $('.survey-questions').on('submit', onSurveyQuestions)
}

module.exports = {
  addHandlers
}
