// 将多个reducer合并成一个reducer
// 如:
//  const rootReducer = combineReducers({
//    TodoDraft: TodoDraftReducer,
//    Todo: TodoReducer
//  })

import { ActionTypes } from './createStore'
import isPlainObject from 'lodash/isPlainObject'
import warning from './utils/warning'

function getUndefinedStateErrorMessage(key, action) {

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {

}

function assertReducerSanity(reducers){

}

// reducer是函数，reducers是对象
export default function combineReducers(reducers){
  // 获取key值, 即TodoDraft和Todo
  var reducerKeys = Object.keys(reducers)
  //
  var finalReducers = {}

  for(var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  var finalReducerKeys = Object.keys(finalReducers)

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {}
  }

  var sanityError
  try {
    assertReducerSanity(finalReducers)
  } catch (e) {
    sanityError = e
  }

  return function combination(state = {}, action) {
    if (sanityError) {
      throw sanityError
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)

      if (warningMessage) {
        warning(warningMessage)
      }
    }

    // state是否改变
    var hasChanged = false
    // 下一个state
    var nextState = {}

    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUnexpectedStateShapeWarningMessage(key, action)
        new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }

    return hasChanged ? nextState : state
  }
}
