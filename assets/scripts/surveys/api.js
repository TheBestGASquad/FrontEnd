'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createSurvey = (data) => {
  console.log('create survey function fired this is data', data)
  return $.ajax({
    url: config.apiOrigin + '/surveys/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const createQuestion = (data) => {
  console.log('create question function fired')
  // ('store.surveyID: ' + store.surveyID)
  // ('data.prompt: ' + data.prompt)
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

const indexOfSurveys = function (data) {
  console.log('index of surveys function fired')
  // ('success index of surveys function fired')
  return $.ajax({
    url: config.apiOrigin + '/surveys/',
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  })
}

// const userIndex = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/user-surveys',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data: {
//       'survey': {
//         'id': store.user._id
//       }
//     }
//   })
// }

const showAuthUserSurveys = (data) => {
  console.log('show authorized user surveys function')
  // ('data is ', data)
  return $.ajax({
    url: config.apiOrigin + '/user-surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const surveyQuestions = function (id) {
  console.log('get one survey question function fired this is id', id)
  // (id)
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
  console.log('show surveys function fired this is id', id)
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  })
}

const destroy = function (id) {
  console.log('delete survey function fired this is id', id)
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteQuestion = (questionId) => {
  console.log('delete one question function fired this is questionId',questionId)
  return $.ajax({
    url: config.apiOrigin + '/questions/' + questionId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = (surveyId, data) => {
  console.log('update survey name function fired this is surveyId', surveyId)
  console.log('update survey name function this is data', data)
  // ('I worked')
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + surveyId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const answerQuestion = (data, id) => {
  console.log('answer question function fired this is id', id)
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

const getQuestionData = (id) => {
  console.log('get question data function fired this is id', id)
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'GET'
  })
}

const editQuestion = (questionId, data) => {
  console.log('edit one question function fired this is questionId', questionId)
  console.log('edit one question fucntion this is data', data)
  return $.ajax({
    url: config.apiOrigin + '/questions/' + questionId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const showUserQuestion = (questionId, data) => {
  console.log('show user question function fired this is questionId', questionId)
  return $.ajax({
    url: config.apiOrigin + '/questions/' + questionId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  createSurvey,
  createQuestion,
  update,
  answerQuestion,
  indexOfSurveys,
  showAuthUserSurveys,
  surveyQuestions,
  show,
  destroy,
  getQuestionData,
  deleteQuestion,
  editQuestion,
  showUserQuestion
}
