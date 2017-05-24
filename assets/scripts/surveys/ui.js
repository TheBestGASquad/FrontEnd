'use strict'

const store = require('../store.js')
const api = require('./api.js')

const unauthUserSurveyHB = require('../templates/surveyHandlebars.handlebars')
const authUserSurveyHB = require('../templates/authUserHandlebars.handlebars')
const answerableSurveyHB = require('../templates/answerableSurvey.handlebars')
const editableSurveyHB = require('../templates/editableSurveys.handlebars')

// const userMessage = (txt) => {
//   const message = $('#message')[0]
//   $(message).text(txt)
//   setTimeout(function () { $('#message').text('') }, 2000)
// }

// const refreshAuthUserSurveyTable = (data) => {
//   console.log(data)
//   const authUserSurveyHtml = authUserSurveyHB({ surveys: data })
//   console.log(store.userSurveys)
//   console.log('refresh-auth-user')
//   $('#auth-user-content').empty()
//   $('#auth-user-content').append(authUserSurveyHtml)
// }

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
  console.log('userSurveys')
  console.log(data)
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
  // console.log(data)
  // if (data.survey.length === 0) {
  //   $('#user-message').text('You have no surveys created.')
  // }
  const userSurveys = authUserSurveyHB({ surveys: data.survey })
  $('#handlebar-target').html(userSurveys)
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
  surveyQuestionFailure
}
