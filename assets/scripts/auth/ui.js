'use strict'
const store = require('../store.js')
// const api = require('./api.js')
// const getFormFields = require(`../../../lib/get-form-fields`)

const resetFormFields = () => {
  document.getElementById('sign-up').reset()
  document.getElementById('sign-in').reset()
  document.getElementById('sign-out').reset()
  document.getElementById('change-password').reset()
  document.getElementById('create-survey').reset()
  document.getElementById('create-question').reset()
}

const signUpSuccess = (data) => {
  $('.alert').text('You Have Successfully Signed Up')
  resetFormFields()
}

const signUpFailure = () => {
  $('.alert').text('You Have Failed to Sign Up')
  resetFormFields()
}

const signInSuccess = (data) => {
  store.user = data.user
  $('.alert').text('You have successfully signed in')
  $('#sign-in-nav').hide()
  $('#sign-up-nav').hide()
  $('form#sign-up').hide()
  $('form#sign-in').hide()
  $('a.dropdown-toggle').css('visibility', 'visible')
  $('#indexOfSurveys').hide()
  $('#indexOfUserSurveys').show()
  $('#create-survey-nav').show()
  $('#handlebar-target').html('')
  resetFormFields()
//   $('button#nav-add-instrument').show()
//   $('button#nav-sign-up').hide()
//   $('button#nav-sign-in').hide()
//   $('form#sign-in').hide()
//   $('button#sign-out').show()
//   $('button#view-instruments').show()
//   $('button#nav-change-password').show()
//   $('div.error-handling').text('')
}

const signInFailure = (data) => {
  $('.alert').text('You Have Failed to Sign In')
  resetFormFields()
}

const signOutSuccess = (data) => {
  $('#sign-in-nav').show()
  $('#sign-up-nav').show()
  $('a.dropdown-toggle').css('visibility', 'invisible')
  $('#indexOfSurveys').show()
  $('#indexOfUserSurveys').hide()
  $('#create-survey-nav').hide()
  $('form').hide()
  $('#handlebar-target').html('')
  $('.alert').text('You have signed out')
  resetFormFields()
}

const signOutFailure = (data) => {
  $('.alert').text('You Have Failed to Sign Out')
  document.querySelector('.core').style.visibility = 'hidden'
  resetFormFields()
}

const changePasswordSuccess = (data) => {
  $('#handlebar-target').text('Password Changed')
  resetFormFields()
}

const changePasswordFailure = () => {
  $('#handlebar-target').text('You Must Give us the Correct Password If You Want to Change It')
  resetFormFields()
}

module.exports = {
  resetFormFields,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
