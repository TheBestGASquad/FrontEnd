'use strict'

const store = require('../store.js')
const api = require('./api.js')
// const showSurveyHB = require('../surveyHandlebars.handlebars')
const showQuestionHB = require('../questionsHandlebars.handlebars')
const unauthUserSurveyHB = require('../surveyHandlebars.handlebars')
const authUserSurveyHB = require('../authUserHandlebars.handlebars')
const answerableSurveyHB = require('../answerableSurvey.handlebars')
// const editableSurveyHB = require('../editableSurveys.handlebars')
const showQuestionHeaderHB = require('../questionsheaderHandlebars.handlebars')

const createSurveySuccess = (response) => {
  store.surveyID = response.survey.id
  const showQuestionHtml = showQuestionHeaderHB({ surveys: response })
  $('form#create-survey').hide()
  $('form#create-question').show()
  $('#content').append(showQuestionHtml)
  console.log('response' + store.userSurveys)
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
  const showQuestionHtml = showQuestionHB({ questions: response })
  $('#content').append(showQuestionHtml)
}

const indexOfSurveysSuccess = (data) => {
  console.log(data)
  $('#handlebar-target').text('')
  $('form').hide()
  if (data.surveys.length === 0) {
    $('#user-message').text('There are no surveys to take.')
  }
  const unauthUserSurveyHtml = unauthUserSurveyHB({ surveys: data.surveys })
  $('#handlebar-target').html(unauthUserSurveyHtml)
}

const indexOfSurveysFailure = (surveyId) => {
  $('#user-message').text('Server ping failed.')
}

const showAuthUserSurveysSuccess = (data) => {
  $('form').hide()
  const answerableSurveyHtml = authUserSurveyHB({ surveys: data.survey })
  $('#handlebar-target').html(answerableSurveyHtml)
}

const showAuthUserSurveysFailure = (data) => {
  console.log('failed to show user surveys', data)
}

const destroySuccess = () => {
  api.showAuthUserSurveys()
    .then(showAuthUserSurveysSuccess)
    .catch(showAuthUserSurveysFailure)
  console.log('successful deletion')
}

const destroyFailure = (data) => {
  console.log('deletion failed')
}

const updateSuccess = (surveyId) => {
  console.log(surveyId)
  console.log('successful update')
  api.showAuthUserSurveys()
    .then(showAuthUserSurveysSuccess)
    .catch(showAuthUserSurveysFailure)
}

const updateFailure = (data) => {
}

const surveyQuestionSuccess = (data) => {
  console.log('hits questions')
  console.log(data)
  const answerableSurvey = answerableSurveyHB({ questions: data.question })
  $('#handlebar-target').html(answerableSurvey)
}

const surveyQuestionFailure = (data) => {
  console.log(data)
  $('.alert').text('failed return')
}

const answerSuccess = (data) => {
  console.log(data)
  $('.alert').text('answer logged')
}

const answerFailure = (data) => {
  console.log(data)
  $('.alert').text('log failure')
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
  surveyQuestionSuccess,
  surveyQuestionFailure,
  answerSuccess,
  answerFailure
}
