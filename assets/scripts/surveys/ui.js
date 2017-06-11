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
  $('form#create-question').show()
  $('div#content').empty()
  $('div#content').show()
  $('#content').html(showQuestionHtml)
  $('#handlebar-target').html('')
  $('.alert').text('You Have Created a New Survey Titled ' + response.survey.title)
 setTimeout(function () { $('.alert').text('') }, 4000)
 resetSurveyFormFields()
}

const createSurveyFailure = () => {
  $('.alert').text('You have Failed to Create a New Survey')
}

const createQuestionSuccess = (response) => {
  $('.alert').text('You Have Added The Question "' + response.question.prompt + '" to This Survey')
  const showQuestionHtml = showQuestionHB({ questions: response })
  $('#content').append(showQuestionHtml)
  document.getElementById('create-question').reset()
  resetSurveyFormFields()
}

const indexOfSurveysSuccess = (data) => {
  $('#handlebar-target').text('')
  $('form').hide()
  if (data.surveys.length === 0) {
    $('.alert').text('There are no Surveys to Take.')
  }
  const unauthUserSurveyHtml = unauthUserSurveyHB({ surveys: data.surveys })
  $('#handlebar-target').html(unauthUserSurveyHtml)
  $('div#content').empty()
  $('.alert').text('')
}

const indexOfSurveysFailure = (surveyId) => {
  $('.alert').text('Unable to Retrieve Data.')
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
  console.log('destroy survey success then show auth user surveys ')
  api.showAuthUserSurveys()
    .then(showAuthUserSurveysSuccess)
    .catch(showAuthUserSurveysFailure)
  $('.alert').text('Successful Survey Deletion')
}

const destroyFailure = (data) => {
  $('.alert').text('Survey Deletion Failed')
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
  }
  const answerableSurvey = answerableSurveyHB({ questions: data.question })
  $('#handlebar-target').html(answerableSurvey)
}

const takeSurveyFailure = (data) => {
  $('.alert').text('Unable to Return Questions From Server')
}

// get survey questions
const surveyQuestionsSuccess = (data) => {
  const editableSurvey = editableSurveyHB({ questions: data.question })
  $('#handlebar-target').html(editableSurvey)
}

const surveyQuestionsFailure = (data) => {
  $('.alert').text('Unable to Return Questions From Server')
}

// answer survey question
const answerSuccess = (data) => {
  const targ = document.getElementById(data._id)
  $(targ).hide()
  $('.alert').text('Your Answer has Been Logged!')
}

const answerFailure = (data) => {
  $('.alert').text('Failure to Log Answers')
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
}

const getQuestionDataFailure = (data) => {
  $('.alert').text('Failure to Return Question')
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
  // console.log('edit question success fired for question', question.id)
    api.surveyQuestions()
      .then(surveyQuestionsSuccess)
      .catch(surveyQuestionsFailure)
    resetSurveyFormFields()
}

const editQuestionFailure = () => {
// console.log('edit question failure data is', data)
resetSurveyFormFields()
  $('.alert').text('Failed to Update Question')
}

// const showUserQuestionSuccess = (data) => {
//   $('#content').hide()
//   $('form').hide()
//   $('.alert').text('')
//   const editQuestionHtml = showQuestionHB({ prompt: data.prompt})
//   $('#content').html(editQuestionHtml)
// }
//
// const showUserQuestionFailure = (data) => {}


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
  editQuestionFailure
  // showUserQuestionSuccess,
  // showUserQuestionFailure
}
