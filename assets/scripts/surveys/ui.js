'use strict'

const store = require('../store')

const createSurveySuccess = (response) => {
  store.surveyID = response.survey.id
  console.log('store.surveyID' + store.surveyID)
  // burndown
  console.log('success')
  console.log(response)
  // burndown
}

const createSurveyFailure = (error) => {
  // burndown
  console.log('failed to create')
  console.log(error)
  // burndown
}

const createQuestionSuccess = (response) => {
  // burndown
  console.log('success')
  console.log(response)
  // burndown
}

const createQuestionFailure = (error) => {
  // burndown
  console.log('failed to create')
  console.log(error)
  // burndown
}

const indexSuccess = (response) => {
  // burndown
  console.log(response)
  console.log('success')
  // burndown
}

const indexFailure = (error) => {
  // burndown
  console.log('failed to index')
  // burndown
}

const showSuccess = (response) => {
  // burndown
  console.log('success')
  console.log(response)
  // burndown
}

const showFailure = (error) => {
  // burndown
  console.log('failed to show')
  // burndown
}

const destroySuccess = (response) => {
  // burndown
  console.log('successful deletion')
  // burndown
}

const destroyFailure = (error) => {
  // burndown
  console.log('deletion failed')
  // burndown
}

const updateSuccess = (response) => {
  // burndown
  console.log(response)
  console.log('successful update')
  // burndown
}

const answerSuccess = (response) => {
  console.log(response)
  console.log('answer logged')
}

const updateFailure = (error) => {
  // burndown
  console.log('update failed')
  // burndown
}

const answerFailure = (error) => {
  console.log('failed to log answer')
}

module.exports = {
  createSurveySuccess,
  createSurveyFailure,
  createQuestionSuccess,
  createQuestionFailure,
  indexSuccess,
  indexFailure,
  showSuccess,
  showFailure,
  destroySuccess,
  destroyFailure,
  updateSuccess,
  updateFailure
}
