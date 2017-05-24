'use strict'
const store = require('../store.js')
// const api = require('./api.js')
// const getFormFields = require(`../../../lib/get-form-fields`)

const signUpSuccess = (data) => {
  console.log('sign-up ', data)

  document.getElementById('sign-up').reset()
  $('.alert').text('Successful Sign up')
}

const signUpFailure = () => {
  console.log('signUpFailure')
  $('.alert').text('Failed Sign up')
}

const signInSuccess = (data) => {
  console.log('signInSuccess')
  store.user = data.user
  console.log(data, data.user)
  $('#sign-in-nav').hide()
  $('#sign-up-nav').hide()
  $('form#sign-up').hide()
  $('form#sign-in').hide()
<<<<<<< HEAD
<<<<<<< HEAD
  $('a.dropdown-toggle').css('visibility', 'visible')
  $('#indexOfSurveys').hide()
  $('#indexOfUserSurveys').show()
  $('#create-survey-nav').show()
=======
  $('.alert').text('Signed in')
>>>>>>> View Survey button fires surveyQuestion API call
=======
  $('.alert').text('Signed in')
>>>>>>> featureone3

//   document.getElementById('sign-in').reset()
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
  console.log('signInFailure ui')
  $('.alert').text('Failed to sign')
  // $('div.error-handling').text('Sign in error')
}

const signOutSuccess = (data) => {
  console.log('signOutSuccess')
  $('.alert').text('Signed out')
}

const signOutFailure = (data) => {
  console.log('signOutFailure')
  document.querySelector('.core').style.visibility = 'hidden'
  $('.alert').text('Failure to sign out')
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
}
