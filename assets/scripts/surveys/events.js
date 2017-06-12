'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const validate = (input) => {
  if (/[a-z]/.test(input.toLowerCase()) === false) { return false }
  return true
}

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
  if (validate(data.survey.title) === true) {
    api.update(surveyId, data)
      .then(ui.updateSuccess)
      .catch(ui.updateFailure)
  } else {
    ui.updateFailure()
  }
}

const onRevealAddQuestion = function (event) {
  $('form#create-survey').toggle()
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
  const questionId = $(event.target).attr('questionId')
  console.log('on delete question fired for question', questionId)
  api.deleteQuestion(questionId)
    .then(ui.deleteQuestionSuccess)
    .catch(ui.deleteQuestionFailure)
}

const onEditQuestion = function (event) {
  event.preventDefault()
  console.log('on edit question fired')
  const questionId = $(event.target).attr('questionId')
  const data = getFormFields(event.target)
  console.log('events.js on edit question fired for question', questionId)
  console.log('events.js on edit question function data', data)
  // if (validate(data.question.prompt) === true) {
    api.editQuestion(questionId, data)
      .then(ui.editQuestionSuccess)
      .catch(ui.editQuestionFailure)
  // } else {
  //   ui.editQuestionFailure()
  // }
}

const onAddQuestion = function (event) {
  event.preventDefault(event)
  // const userId = $(this).attr('userId')
  // api.showAuthUserSurveys(data)
  const surveyId = $(this).attr('surveyId')
  let data = getFormFields(event.target)
  // data = data.questions
  // console.log('on add question function fired this is surveyId', surveyId)
  // console.log('on add question this is data', data)
  api.addQuestion(surveyId, data)
    .then(ui.addQuestionSucess)
    .catch(ui.addQuestionFailure)
}

const onShowUserSurveyTaken = function (event) {
  event.preventDefault()
  const userId = $(this).attr('userId')
  api.showAuthUserSurveys(userId)
  console.log('on show user survey taken userId is', userId)
  const surveyId = $(this).attr('surveyId')
  console.log('on show user survey taken surveyId is', surveyId)
  const data = getFormFields(event.target)
  // console.log('on show user survey taken data is', data)
  api.showUserSurveyTaken(surveyId)
    .then(ui.showUserSurveyTakenSuccess)
    .catch(ui.showUserSurveyTakenFailure)
}

const addHandlers = () => {
  $('#create-survey').on('submit', onCreateSurvey)
  $('#create-question').on('submit', onCreateQuestion)
  $('#indexOfSurveys').on('click', onIndexOfSurveys)
  $('#indexOfUserSurveys').on('click', onShowAuthUserSurveys)
  $('#indexOfSurveysTaken').on('click', onShowUserSurveyTaken)
  $('#create-survey-nav').on('click', onRevealAddQuestion)
  $('#handlebar-target').on('click', '.delete-auth-survey-button', onDestroy)
  $('#handlebar-target').on('submit', '.update-survey', onUpdate)
  $('#handlebar-target').on('click', '.view-questions-button', onRevealAddQuestion)
  $('#handlebar-target').on('click', '.take-survey', takeSurvey)
  $('#handlebar-target').on('click', '.answer-question', onAnswerQuestion)
  $('#handlebar-target').on('click', '.view-questions-button', onSurveyQuestions)
  $('#handlebar-target').on('click', '.get-data', onGetQuestionData)
  $('#content').on('click', '.delete-question-button', onDeleteQuestion),
  $('#content').on('submit', '.edit-question', onEditQuestion)
  $('#handlebar-target').on('submit', '.add-question', onAddQuestion)
}

module.exports = {
  addHandlers
}
