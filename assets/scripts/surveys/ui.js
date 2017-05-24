'use strict'

const store = require('../store.js')
const api = require('./api.js')

const unauthUserSurveyHB = require('../surveyHandlebars.handlebars')
const authUserSurveyHB = require('../authUserHandlebars.handlebars')
// const answerableSurveyHB = require('../answerableSurvey.handlebars')
const editableSurveyHB = require('../editableSurveys.handlebars')

// const userMessage = (txt) => {
//   const message = $('#message')[0]
//   $(message).text(txt)
//   setTimeout(function () { $('#message').text('') }, 2000)
// }

const refreshUnauthUserSurveyTable = () => {
  const unauthUserSurveyHtml = unauthUserSurveyHB({ surveys: store.userSurveys })
  console.log('refresh-unauth-user')
  $('#unauth-user-content').empty()
  $('#unauth-user-content').append(unauthUserSurveyHtml)
}

const refreshAuthUserSurveyTable = () => {
  const authUserSurveyHtml = authUserSurveyHB({ surveys: store.userSurveys })
  console.log('refresh-auth-user')
  $('#auth-user-content').empty()
  $('#auth-user-content').append(authUserSurveyHtml)
}

// const refreshAnswerableSurveyTable = () => {
//   const answerableSurveyHtml = answerableSurveyHB({ surveys: store.userSurveys })
//   console.log('refresh-answerable')
//   $('#answerable-survey').empty()
//   $('#answerable-survey').append(answerableSurveyHtml)
// }

const refreshEditableSurveyTable = () => {
  const editableSurveyHtml = editableSurveyHB({ surveys: store.userSurveys })
  console.log('refresh-editable')
  $('#editable-survey').empty()
  $('#editable-survey').append(editableSurveyHtml)
}

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

const indexOfSurveysSuccess = (data) => {
  // if (data.userSurveys.length === 0) {
  //   userMessage('You have no surveys created.')
  // }
  store.userSurveys = data.surveys
  refreshUnauthUserSurveyTable()
}

const indexOfSurveysFailure = (surveyId) => {
  store.userSurveys = surveyId.surveys
  console.log('failed to index')
}

const showAuthUserSurveysSuccess = (data) => {
  console.log('show auth user survey fired', data)
  refreshAuthUserSurveyTable()
  store.userSurveys = data.surveys
}

const showAuthUserSurveysFailure = (data) => {
  console.log('failed to show user surveys', data)
}

const destroySuccess = () => {
  refreshEditableSurveyTable()
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
  refreshEditableSurveyTable()
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
  showAuthUserSurveysSuccess,
  showAuthUserSurveysFailure
}
