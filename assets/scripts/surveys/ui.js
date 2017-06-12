'use strict'

const store = require('../store.js')
const api = require('./api.js')
// const showSurveyHB = require('../surveyHandlebars.handlebars')
const showQuestionHB = require('../questionsHandlebars.handlebars')
const unauthUserSurveyHB = require('../surveyHandlebars.handlebars')
const authUserSurveyHB = require('../authUserHandlebars.handlebars')
const answerableSurveyHB = require('../answerableSurvey.handlebars')
const editableSurveyHB = require('../editableSurveys.handlebars')
const showQuestionHeaderHB = require('../questionsheaderHandlebars.handlebars')

const resetSurveyFormFields = () => {
  $('form#sign-up').trigger('reset')
  $('form#sign-in').trigger('reset')
  $('form#sign-out').trigger('reset')
  $('form#change-password').trigger('reset')
  $('form#create-survey').trigger('reset')
  $('form#create-question').trigger('reset')
}

const createSurveySuccess = (response) => {
  store.surveyID = response.survey.id
  const showQuestionHtml = showQuestionHeaderHB({ surveys: response })
  $('.alert').text('')
  $('form#create-survey').hide()
  $('form#change-password').hide()
  $('form#create-question').show()
  $('div#content').empty()
  $('div#content').show()
  $('#content').html(showQuestionHtml)
  $('#handlebar-target').html('')
  $('.alert').text('You Have Created a New Survey Titled ' + response.survey.title)
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const createSurveyFailure = (error) => {
  $('.alert').text('You have Failed to Create a New Survey')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const createQuestionSuccess = (response) => {
  $('.alert').text('You Have Added The Question "' + response.question.prompt + '" to This Survey')
  setTimeout(function () { $('.alert').text('') }, 4000)
  const showQuestionHtml = showQuestionHB({ questions: response })
  $('#content').append(showQuestionHtml)
  resetSurveyFormFields()
}

const indexOfSurveysSuccess = (data) => {
  $('#handlebar-target').text('')
  $('form').hide()
  if (data.surveys.length === 0) {
    $('.alert').text('There are no Surveys to Take.')
    setTimeout(function () { $('.alert').text('') }, 4000)
    resetSurveyFormFields()
  }

  const unauthUserSurveyHtml = unauthUserSurveyHB({ surveys: data.surveys })
  $('#handlebar-target').html(unauthUserSurveyHtml)
  $('div#content').empty()
  $('.alert').text('')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const indexOfSurveysFailure = (surveyId) => {
  $('.alert').text('Unable to Retrieve Data.')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const showAuthUserSurveysSuccess = (data) => {
  $('#content').hide()
  $('form').hide()
  $('.alert').text('')
  const answerableSurveyHtml = authUserSurveyHB({ surveys: data.survey })
  $('#handlebar-target').html(answerableSurveyHtml)
  $('.alert').text('')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const showAuthUserSurveysFailure = (data) => {
  $('.alert').text('Unable to Retrieve Data.')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const destroySuccess = () => {
  api.showAuthUserSurveys()
    .then(showAuthUserSurveysSuccess)
    .catch(showAuthUserSurveysFailure)
  $('.alert').text('Successful Survey Deletion')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const destroyFailure = (data) => {
  $('.alert').text('Survey Deletion Failed')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const updateSuccess = (surveyId) => {
  api.showAuthUserSurveys()
    .then(showAuthUserSurveysSuccess)
    .catch(showAuthUserSurveysFailure)
  resetSurveyFormFields()
}

const updateFailure = (data) => {
  $('.alert').text('Form cannot be empty')
  setTimeout(function () { $('.alert').text('') }, 4000)
}

const takeSurveySuccess = (data) => {
  if (data.question.length === 0) {
    $('.alert').text('There are no Questions to Answer.')
    setTimeout(function () { $('.alert').text('') }, 4000)
    resetSurveyFormFields()
  }

  const answerableSurvey = answerableSurveyHB({ questions: data.question })
  $('#handlebar-target').html(answerableSurvey)
}

const takeSurveyFailure = (data) => {
  $('.alert').text('Unable to Return Questions From Server')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const surveyQuestionsSuccess = (data) => {
  const editableSurvey = editableSurveyHB({ questions: data.question })
  $('#handlebar-target').html(editableSurvey)
}

const surveyQuestionsFailure = (data) => {
  $('.alert').text('Unable to Return Questions From Server')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const answerSuccess = (data) => {
  const targ = document.getElementById(data._id)
  $(targ).hide()
  $('.alert').text('Your Answer has Been Logged!')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const answerFailure = (data) => {
  $('.alert').text('Failure to Log Answers')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const extractVal = (data) => {
  let layer = Object.values(data)
  layer = Object.values(layer[0])
  return layer[0]
}

const getQuestionDataSuccess = (data) => {
  let yes = 0
  let no = 0
  for (let i = 0; i < data.question.results.length; i++) {
    extractVal(data.question.results[i]) === true ? yes++ : no++
  }
  $('.alert').text(`The question '${data.question.prompt}' has been answered ${data.question.results.length} times. It got a yes ${yes} times and a no ${no} times.`)
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const getQuestionDataFailure = (data) => {
  $('.alert').text('Failure to Return Question')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const deleteQuestionSuccess = () => {
  api.showAuthUserSurveys()
    .then(showAuthUserSurveysSuccess)
    .catch(showAuthUserSurveysFailure)
  $('.alert').text('Question Deleted')
}

const deleteQuestionFailure = (questionId) => {
  $('.alert').text('Failed to Delete Question')
}

const editQuestionSuccess = (data) => {
    api.surveyQuestions()
      .then(surveyQuestionsSuccess)
      .catch(surveyQuestionsFailure)
    resetSurveyFormFields()
}

const editQuestionFailure = () => {
resetSurveyFormFields()
  $('.alert').text('Failed to Update Question')
}

const addQuestionSuccess = (response) => {
  // store.surveyID = response.question.prompt
  const showUserQuestionHtml = authUserSurveyHB({ questions: response.question.prompt })
  $('#content').append(showUserQuestionHtml)
  document.getElementById('add-question').reset()
  resetSurveyFormFields()
}

const addQuestionFailure = () => {
  resetSurveyFormFields()
  $('.alert').text('Failed to Add a Question')
}


const showUserSurveyTakenSuccess = (data) => {
  $('#content').hide()
  $('form').hide()
  $('.alert').text('')
  const answerableSurveyHtml = authUserSurveyHB({ surveys: data.survey })
  $('#handlebar-target').html(answerableSurveyHtml)
  $('.alert').text('')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
}

const showUserSurveyTakenFailure = (data) => {
  $('.alert').text('Unable to Retrieve Data.')
  setTimeout(function () { $('.alert').text('') }, 4000)
  resetSurveyFormFields()
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
  showAuthUserSurveysSuccess,
  showAuthUserSurveysFailure,
  takeSurveySuccess,
  takeSurveyFailure,
  answerSuccess,
  answerFailure,
  surveyQuestionsSuccess,
  surveyQuestionsFailure,
  getQuestionDataSuccess,
  getQuestionDataFailure,
  deleteQuestionSuccess,
  deleteQuestionFailure,
  editQuestionSuccess,
  editQuestionFailure,
  showUserSurveyTakenSuccess,
  showUserSurveyTakenFailure,
  addQuestionSuccess,
  addQuestionFailure
}
