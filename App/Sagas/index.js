import { takeLatest, all } from 'redux-saga/effects'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import {
  LOGIN_FACEBOOK, REGISTER_EMAIL, LOGIN_EMAIL, SEND_VERIFY_CODE, CONFIRM_CODE, CHECK_USER_AUTH,
  SIGN_OUT, RESET_PASSWORD, CHANGE_PASSWORD,
} from '../Redux/AuthRedux'

import {
  UPDATE_PROFILE, GET_ACCESS_KEYS, UPDATE_USER_LOCATION
} from '../Redux/UserRedux'

import {
  SET_HANGOUTS_FILTERS,
} from '../Redux/HangoutRedux'

/* ------------- Sagas ------------- */

import {
  loginFacebook, registerEmail, loginEmail, sendVerificationCode, confirmCode, checkUserAuthenticated,
  signOut, resetPassword, changePassword,
} from './AuthSagas'

import {
  updateProfile, getAccessKeys, updateUserLocation,
} from './UserSagas'

import {
  setHangoutsFilters,
} from './HangoutSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(LOGIN_FACEBOOK.ATTEMPT, loginFacebook),
    takeLatest(REGISTER_EMAIL.ATTEMPT, registerEmail),
    takeLatest(LOGIN_EMAIL.ATTEMPT, loginEmail),
    takeLatest(SEND_VERIFY_CODE.ATTEMPT, sendVerificationCode),
    takeLatest(CONFIRM_CODE.ATTEMPT, confirmCode),
    takeLatest(CHECK_USER_AUTH.ATTEMPT, checkUserAuthenticated),
    takeLatest(SIGN_OUT.ATTEMPT, signOut),
    takeLatest(RESET_PASSWORD.ATTEMPT, resetPassword),
    takeLatest(CHANGE_PASSWORD.ATTEMPT, changePassword),

    takeLatest(UPDATE_PROFILE.ATTEMPT, updateProfile),
    takeLatest(GET_ACCESS_KEYS.ATTEMPT, getAccessKeys),
    takeLatest(UPDATE_USER_LOCATION.ATTEMPT, updateUserLocation),

    takeLatest(SET_HANGOUTS_FILTERS.ATTEMPT, setHangoutsFilters),
  ])
}
