// 以todos为例

//
import isPlainObject from 'lodash/isPlainObject'
//
import $$observabel from 'symbol-observabel'

export var ActionTypes = {
  INIT: '@@redux/INIT'
}

export default function createStore(reducer, preloadedState, enhancer) {
  // 当情况如下时，enhancer这个对中间件的参数被写于第二个参数时
  // const store = createStore(reducer, applyMiddleware(thunk))
  // 就会将preloadedState赋给enhancer
  // 达到enhancer能被正确地赋值
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  var currentReducer = reducer
  var currentState = preloadedState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false

  function ensureCanMutateNextListener() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  // 得到当前的state
  function getState() {
    return currentState
  }

  // 将一个事件加入listeners
  // 返回一个函数，用来去掉listener中的这个事件
  function subscribe(listener) {
    if( typeof listener !== 'function' ){
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribe = false

      ensureCanMutateNextListeners()

      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  // 传递action给reducer
  function dispatch(action) {
    // 检测action是否为plain object
    // 所谓plain object
    // 是对于通过字面量定义的对象和new Object的对象返回true，new Object时传参数的返回false
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    // 检测action里面是否有type属性
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // 使用Reducer更新state, reducer本质是一种操作
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    var listeners = currentListeners = nextListeners
    for( var i = 0 ; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }

  // 改变当前的reducer
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }

  // 创建一个观察者对象
  // 这个对象有个订阅的方法，用来订阅事件
  function observable() {
    var outerSubscribe = subscribe
    return {
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()

        var unsubscribe = outerSubscribe(observeState)

        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }

  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
