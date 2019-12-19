import { createAsyncAction, createAsyncType, createReducer } from 'app/Services/reduxHelpers'
import { path } from 'ramda'
/* ------------- Types ------------- */

const LOGIN_FACEBOOK_TYPE = 'LOGIN_FACEBOOK_TYPE'
const REGISTER_EMAIL_TYPE = 'REGISTER_EMAIL_TYPE'
const LOGIN_EMAIL_TYPE = 'LOGIN_EMAIL_TYPE'
const SEND_VERIFY_CODE_TYPE = 'SEND_VERIFY_CODE_TYPE'
const CONFIRM_CODE_TYPE = 'CONFIRM_CODE_TYPE'
const CHECK_USER_AUTH_TYPE = 'CHECK_USER_AUTH_TYPE'
const SIGN_OUT_TYPE = 'SIGN_OUT_TYPE'
const RESET_PASSWORD_TYPE = 'RESET_PASSWORD_TYPE'
const CHANGE_PASSWORD_TYPE = 'CHANGE_PASSWORD_TYPE'

/* ------------- Action Creators ------------- */

export const LOGIN_FACEBOOK = createAsyncType(LOGIN_FACEBOOK_TYPE)
export const LoginFacebookActions = createAsyncAction(LOGIN_FACEBOOK)

export const REGISTER_EMAIL = createAsyncType(REGISTER_EMAIL_TYPE)
export const RegisterEmailActions = createAsyncAction(REGISTER_EMAIL)

export const LOGIN_EMAIL = createAsyncType(LOGIN_EMAIL_TYPE)
export const LoginEmailActions = createAsyncAction(LOGIN_EMAIL)

export const SEND_VERIFY_CODE = createAsyncType(SEND_VERIFY_CODE_TYPE)
export const SendVerifyCodeActions = createAsyncAction(SEND_VERIFY_CODE)

export const CONFIRM_CODE = createAsyncType(CONFIRM_CODE_TYPE)
export const ConfirmCodeActions = createAsyncAction(CONFIRM_CODE)

export const CHECK_USER_AUTH = createAsyncType(CHECK_USER_AUTH_TYPE)
export const CheckUserAuthActions = createAsyncAction(CHECK_USER_AUTH)

export const SIGN_OUT = createAsyncType(SIGN_OUT_TYPE)
export const SignOutActions = createAsyncAction(SIGN_OUT)

export const RESET_PASSWORD = createAsyncType(RESET_PASSWORD_TYPE)
export const ResetPasswordActions = createAsyncAction(RESET_PASSWORD)

export const CHANGE_PASSWORD = createAsyncType(CHANGE_PASSWORD_TYPE)
export const ChangePasswordActions = createAsyncAction(CHANGE_PASSWORD)

/* ------------- Initial State ------------- */

export const initialState = {
  isAuthLoading: false,
}

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  authenticatedSelector: state => state.auth.isAuthenticated,
  authLoadingSelector: state => state.auth.isAuthLoading,
  passwordSelector: (state, formName) => path(['form', formName, 'values', 'password'], state),
  emailSelector: (state, formName) => path(['form', formName, 'values', 'email'], state),
  formSelector: (state, { formName, fieldName }) => path(['form', formName, 'values', fieldName], state),
}

/* ------------- Reducers ------------- */

export const checkAuthRequest = () =>
  ({ isAuthLoading: true, isAuthenticated: false })

export const checkAuthSuccess = () =>
  ({ isAuthLoading: false })

export const checkAuthFailure = () =>
  ({ isAuthLoading: false })

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [LOGIN_FACEBOOK.ATTEMPT]: checkAuthRequest,
  [LOGIN_FACEBOOK.SUCCESS]: checkAuthSuccess,
  [LOGIN_FACEBOOK.FAILURE]: checkAuthFailure,

  [REGISTER_EMAIL.ATTEMPT]: checkAuthRequest,
  [REGISTER_EMAIL.SUCCESS]: checkAuthSuccess,
  [REGISTER_EMAIL.FAILURE]: checkAuthFailure,

  [LOGIN_EMAIL.ATTEMPT]: checkAuthRequest,
  [LOGIN_EMAIL.SUCCESS]: checkAuthSuccess,
  [LOGIN_EMAIL.FAILURE]: checkAuthFailure,

  [CONFIRM_CODE.ATTEMPT]: checkAuthRequest,
  [CONFIRM_CODE.SUCCESS]: checkAuthSuccess,
  [CONFIRM_CODE.FAILURE]: checkAuthFailure,

  [RESET_PASSWORD.ATTEMPT]: checkAuthRequest,
  [RESET_PASSWORD.SUCCESS]: checkAuthSuccess,
  [RESET_PASSWORD.FAILURE]: checkAuthFailure,

  [CHANGE_PASSWORD.ATTEMPT]: checkAuthRequest,
  [CHANGE_PASSWORD.SUCCESS]: checkAuthSuccess,
  [CHANGE_PASSWORD.FAILURE]: checkAuthFailure,
})
