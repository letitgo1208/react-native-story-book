import ReduxPersist from '../Config/ReduxPersist'
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import { CheckUserAuthActions } from 'app/Redux/AuthRedux'

// window.LOG_LEVEL = 'DEBUG'

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startup = () => store.dispatch(CheckUserAuthActions.Attempt())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, null, startup).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, null, startup)
    }
  }).catch(() => {
    persistStore(store, null, startup)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default { updateReducers }
