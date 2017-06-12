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
    data: data
  })
}

const createQuestion = (data) => {
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

const deleteQuestion = (id) => {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = (surveyId, data) => {
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
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'GET'
  })
}

const editQuestion = (questionId, data) => {
  console.log('api.js edit one question function fired this is questionId', questionId)
  console.log('edit question data', data)
  return $.ajax({
    url: config.apiOrigin + '/edit-questions/' + questionId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'question': {
        'prompt': data
      }
    }
  })
}

const addQuestion = (surveyId, data) => {
  console.log(data.question.prompt)
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'question': {
        'prompt': data.question.prompt,
        '_survey': surveyId
      }
    }
  })
  // console.log('add question function this is surveyId', surveyId)
  // console.log('add question function this is data', data)
  // return $.ajax({
  //   url: config.apiOrigin + '/add-questions/' + surveyId,
  //   method: 'POST',
  //   headers: {
  //     Authorization: 'Token token=' + store.user.token
  //   },
  //   data
    // {
    //   'question': {
    //     'prompt': data.prompt,
    //     '_survey': store.surveyId
    //   }
    // }
  // })
}

const showUserSurveyTaken = (surveyId, data) => {
  console.log('show user question function fired this is surveyId', surveyId)
  return $.ajax({
    url: config.apiOrigin + '/user-surveys/' + surveyId,
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
  showUserSurveyTaken,
  addQuestion
}
