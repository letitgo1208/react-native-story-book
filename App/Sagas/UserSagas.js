import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { path } from 'ramda'
import { noop } from 'lodash'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import {
  UserSelectors,
  UpdateProfileActions,
  GetAccessKeysActions,
  UpdateUserLocationActions,
} from 'app/Redux/UserRedux'
import { alert } from 'app/Services/Helpers'
import { startMainView } from 'app/Navigation/ConfigureNavigation'
import NavigationActions from 'app/Navigation/NavigationActions'
import API from 'app/Services/Api'

export function * updateProfile (action) {
  try {
    const profileId = yield select(UserSelectors.profileIdSelector)
    const { type, ...profile } = action

    yield put(UpdateProfileActions.Success({ profile }))
    yield put(GetAccessKeysActions.Success({
      keys: { profileId: 'test' }
    }))

    if (!!profileId) {
      yield put(NavigationActions.pop())
    } else {
      startMainView()
    }
  } catch (error) {
    console.log(error)
    yield put(UpdateProfileActions.Failure())
  }
}

export function * getAccessKeys (action) {
  try {
    const userId = yield select(UserSelectors.userIdSelector)
  //  const keys = yield call(API.)
    const keys = { }
    yield put(GetAccessKeysActions.Success({ keys }))
    if (!keys.profile) {
      yield put(NavigationActions.push(
        routeNames.ProfileScreen,
        { ...routeParams.defaultNavbar, backButtonHidden: true, title: 'Profile' }
      ))
    } else {
      startMainView()
    }
  } catch (error) {
    console.log(error)
    yield put(GetAccessKeysActions.Failure())
  }
}

export function * updateUserLocation (action) {
  try {
    const { latitude, longitude } = action
    const profileId = yield select(UserSelectors.profileIdSelector)

    const location = {
      latitude,
      longitude,
    }

    yield put(UpdateUserLocationActions.Success({ location }))
  } catch (error) {
    console.log(error)
    yield put(UpdateUserLocationActions.Failure())
  }
}