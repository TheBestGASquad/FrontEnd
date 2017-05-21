'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onRevealSignUp = function () {
  console.log('reavealevents')
  $('form#sign-up').animate({
    height: 'toggle'
  }, 200, function () {})
  $('form#sign-in').hide()
  $('form#add-instrument').hide()
}

const onSignUp = function (event) {
  console.log('eventssignup')
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

// const onChangePassword = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//
//   api.changePassword(data)
//     .then(ui.changePasswordSuccess)
//     .catch(ui.changePasswordFailure)
// }
//
// const onSignOut = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   api.signOut(data)
//     .then(ui.signOutSuccess)
//     .catch(ui.signOutFailure)
// }

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('li#sign-up-nav.active').on('click', onRevealSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('li#sign-out').on('click', onSignOut)
}
module.exports = {
  addHandlers
}