import { createAsyncAction, createAsyncType, createReducer } from 'app/Services/reduxHelpers'
import { path } from 'ramda'
import {
  SEND_VERIFY_CODE,
  CHECK_USER_AUTH,
  REGISTER_EMAIL,
  LOGIN_FACEBOOK,
  RESET_PASSWORD,
  LOGIN_EMAIL,
  SIGN_OUT,
} from './AuthRedux'
/* ------------- Types ------------- */

const LOGIN_FACEBOOK_TYPE = 'LOGIN_FACEBOOK_TYPE'
const REGISTER_EMAIL_TYPE = 'REGISTER_EMAIL_TYPE'
const UPDATE_PROFILE_TYPE = 'UPDATE_PROFILE_TYPE'

const GET_ACCESS_KEYS_TYPE = 'GET_ACCESS_KEYS_TYPE'
const UPDATE_USER_LOCATION_TYPE = 'UPDATE_USER_LOCATION_TYPE'

/* ------------- Action Creators ------------- */

export const UPDATE_PROFILE = createAsyncType(UPDATE_PROFILE_TYPE)
export const UpdateProfileActions = createAsyncAction(UPDATE_PROFILE)

export const GET_ACCESS_KEYS = createAsyncType(GET_ACCESS_KEYS_TYPE)
export const GetAccessKeysActions = createAsyncAction(GET_ACCESS_KEYS)

export const UPDATE_USER_LOCATION = createAsyncType(UPDATE_USER_LOCATION_TYPE)
export const UpdateUserLocationActions = createAsyncAction(UPDATE_USER_LOCATION)

/* ------------- Initial State ------------- */

export const initialState = {
  isUserLoading: false,
  profile: null,
  keys: null,
  location: null
}

/* ------------- Selectors ------------- */

export const UserSelectors = {
  userLoadingSelector: state => state.user.isUserLoading,
  userIdSelector: state => path(['user', 'keys', 'userId'], state),
  userEmailSelector: state => path(['user', 'profile', 'email'], state),
  userAvatarSelector: state => path(['user', 'profile', 'imgUrl'], state),
  userFirstNameSelector: state => path(['user', 'profile', 'firstName'], state),
  userLastNameSelector: state => path(['user', 'profile', 'lastName'], state),
  userBirthDateSelector: state =>   path(['form', 'ProfileForm', 'values', 'birthDate'], state),
  profileIdSelector: state => path(['user', 'keys', 'profileId'], state),
  userLocationSelector: state => path(['user', 'location'], state),
}

/* ------------- Reducers ------------- */

export const registerEmailSuccess = (state, { email }) =>
  ({ profile: { email } })
  
export const loginSuccess = (state, { email, userId }) => ({
  profile: { email },
  keys: { userId },
})

export const checkAuthSuccess = (state, { userId }) => ({
  keys: { userId }
})

export const loginFacebookSuccess = (state, { user, keys }) => ({
  profile: { ...user },
  keys: {
    ...state.keys,
    keys,
  }
})

export const loginAttempt = () =>
  ({ profile: null })

export const resetPasswordSuccess = (state, { email }) => ({
  profile: { email }
})

export const updateProfileAttempt = () =>
  ({ isUserLoading: true })

export const updateProfileSuccess = (state, { profile }) => ({
  profile: {
    ...state.profile,
    ...profile, 
  },
  isUserLoading: false,
})

export const updateProfileFailure = () =>
  ({ isUserLoading: false })

export const getAccessKeysSuccess = (state, { keys }) => ({
  keys: {
    ...state.keys,
    keys,
  }
})

export const resetData = () => ({
  keys: null,
  profile: null,
})

export const clearUserData = (state) => ({
  ...initialState,
  profile: {
    email: state.profile.email
  }
})

export const updateUserLocation = (state, { location }) => ({
  location
})

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [REGISTER_EMAIL.SUCCESS]: registerEmailSuccess,

  [LOGIN_EMAIL.ATTEMPT]: loginAttempt,
  [LOGIN_EMAIL.SUCCESS]: loginSuccess,

  [SEND_VERIFY_CODE.ATTEMPT]: loginSuccess,

  [LOGIN_FACEBOOK.ATTEMPT]: loginAttempt,
  [LOGIN_FACEBOOK.SUCCESS]: loginFacebookSuccess,

  [CHECK_USER_AUTH.SUCCESS]: checkAuthSuccess,
  [RESET_PASSWORD.SUCCESS]: resetPasswordSuccess,

  [UPDATE_PROFILE.ATTEMPT]: updateProfileAttempt,
  [UPDATE_PROFILE.SUCCESS]: updateProfileSuccess,
  [UPDATE_PROFILE.FAILURE]: updateProfileFailure,

  [GET_ACCESS_KEYS.SUCCESS]: getAccessKeysSuccess,

  [SIGN_OUT.FAILURE]: resetData,
  [SIGN_OUT.SUCCESS]: clearUserData,

  [UPDATE_USER_LOCATION.SUCCESS]: updateUserLocation,
})
