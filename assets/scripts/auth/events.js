'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const resetFormFields = () => {
  $('form#sign-up').trigger('reset')
  $('form#sign-in').trigger('reset')
  $('form#create-survey').trigger('reset')
  $('form#create-question').trigger('reset')
}

const onRevealSignUp = function () {
  $('form').hide()
  $('#handlebar-target').text('')
  $('form#sign-up').animate({
    height: 'toggle'
  }, 200, function () {})
  $('form#sign-in').hide()
  resetFormFields()
}

const onRevealSignIn = function () {
  $('form').hide()
  $('#handlebar-target').text('')
  $('form#sign-in').animate({
    height: 'toggle'
  }, 200, function () {})
  $('form#sign-up').hide()
  resetFormFields()
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onRevealChangePassword = function () {
  $('form').hide()
  $('#content').hide()
  $('#handlebar-target').text('')
  $('form#change-password').animate({
    height: 'toggle'
  }, 200, function () {})
  // $('form#sign-up').hide()
  // $('form#sign-in').hide()
  resetFormFields()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-up-nav').on('click', onRevealSignUp)
  $('#sign-in-nav').on('click', onRevealSignIn)
  $('#sign-in').on('submit', onSignIn)
  $('li#sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#nav-change-password').on('click', onRevealChangePassword)
}
module.exports = {
  addHandlers
}
