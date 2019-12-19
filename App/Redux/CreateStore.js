import { createStore, applyMiddleware, compose } from 'redux'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- redux-thunk Middleware ------------- */

  middleware.push(thunk)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const createAppropriateStore = createStore
  const store = createAppropriateStore(rootReducer, compose(
    ...enhancers,
    global.reduxNativeDevTools ? global.reduxNativeDevTools() : nope => nope
  ))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
