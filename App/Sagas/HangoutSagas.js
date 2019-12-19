import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { path } from 'ramda'
import { noop } from 'lodash'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import {
  SetHangoutFiltersActions
} from 'app/Redux/HangoutRedux'
import { alert } from 'app/Services/Helpers'
import NavigationActions from 'app/Navigation/NavigationActions'
import API from 'app/Services/Api'

export function * setHangoutsFilters (action) {
  try {
    const { type, ...filters } = action
    yield put(SetHangoutFiltersActions.Success({ filters }))
    yield put(NavigationActions.dismissLightBox())
  } catch (error) {
    yield put(SetHangoutFiltersActions.Failure())
  }
}
