'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createSurvey = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/surveys/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const createQuestion = (data) => {
  console.log("store.surveyID: " + store.surveyID)
  console.log('data.prompt: ' + data.prompt)
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'question': {
        'prompt': data.prompt,
        '_survey': store.surveyID
      }
    }
  })
}

const index = function () {
  return $.ajax({
    url: config.apiOrigin + '/surveys/',
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  })
}

const userIndex = function () {
  return $.ajax({
    url: config.apiOrigin + '/user-surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'survey': {
        'id': store.user._id
      }
    }
  })
}

const surveyQuestions = function (id) {
  console.log(id)
  return $.ajax({
    url: config.apiOrigin + '/questions',
    method: 'GET',
    data: {
      'question': {
        '_survey': id
      }
    }
  })
}

const show = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  })
}

const destroy = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = (data, id) => {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const answerQuestion = (data, id) => {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'PATCH',
    data: {
      'question': {
        'results': [{
          'response': data
        }]
      }
    }
  })
}

module.exports = {
  createSurvey,
  createQuestion,
  update,
  answerQuestion,
  index,
  userIndex,
  surveyQuestions,
  show,
  destroy
}
