import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { path } from 'ramda'
import { noop } from 'lodash'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

import { UserSelectors, GetAccessKeysActions } from 'app/Redux/UserRedux'
import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import {
  LoginFacebookActions, LoginEmailActions, RegisterEmailActions, SendVerifyCodeActions, AuthSelectors,
  ConfirmCodeActions, CheckUserAuthActions, SignOutActions, ResetPasswordActions, ChangePasswordActions,
} from 'app/Redux/AuthRedux'
import { showAlert } from 'app/Services/Helpers'
import NavigationActions from 'app/Navigation/NavigationActions'
import { startApp, startMainView } from 'app/Navigation/ConfigureNavigation'
import API from 'app/Services/Api'
import { AccessToken } from 'react-native-fbsdk'
import { Auth } from 'aws-amplify'


const AWS_COGNITO_POOL_ID = 'eu-west-2:ee6a2121-2a10-4fc9-bf8f-4ea40b1b666e'
const AWS_REGION = 'eu-west-2'

const authFacebook = (accessToken) => {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_COGNITO_POOL_ID,
    Logins: {
      'graph.facebook.com': accessToken,
    },
  }, { region: AWS_REGION })
  return new Promise((resolve, reject) =>
    AWS.config.credentials.get((err) => {
      if (err) {
        reject()
      } else {
        resolve()
      }
    }
  ))
}

export function * loginFacebook (action) {
  try {
    const result = yield call(API.loginFacebook)
    if (result.isCancelled) {
      yield put(LoginFacebookActions.Failure())
    } else {
      const data = yield call(API.getAccessTokenData)
      if (!!data) {
        yield call(authFacebook, data.accessToken)

        const { first_name, last_name, email, gender, birthday, id } = yield call(API.getGraphRequest)
        const user = {
          firstName: first_name,
          lastName: last_name,
          email,
          gender,
          birthDate: birthday,
          imgUrl: `https://graph.facebook.com/${id}/picture?width=150&height=150`
        }
        yield delay(300)
        yield put(LoginFacebookActions.Success({ user, keys: { userId: id } }))
        yield put(GetAccessKeysActions.Attempt())
      } else {
        yield put(LoginFacebookActions.Failure())
      }
    }
  } catch (error) {
    showAlert(error)
    yield put(LoginFacebookActions.Failure())
  }
}

export function * registerEmail (action) {
  try {
    const { email, password } = action
    const { userSub, user: { userName } } = yield call(API.signUp, password, email)
  
    yield put(NavigationActions.push(routeNames.EmailVerificationScreen, {
      ...routeParams.transparentNavbar,
      passProps: { initialValues: { email, code: '' } }
    }))
    yield put(RegisterEmailActions.Success({ email }))

  } catch (error) {
    const { code, message } = error
    if (code === 'UsernameExistsException') {
      showAlert('User already exists. Log in to the application')
    } else {
      showAlert(message)
    }
    yield put(RegisterEmailActions.Failure(error))
  }
}

export function * loginEmail (action) {
  const { email, password } = action
  try {
    const response = yield call(API.logIn, password, email)
    const userId = path(['signInUserSession', 'idToken', 'payload', 'aud'], response)

    yield put(LoginEmailActions.Success({ email, userId }))
    yield put(GetAccessKeysActions.Attempt())

  } catch (error) {
    const { code, message } = error
    if (code === 'UserNotConfirmedException') {
      yield put(SendVerifyCodeActions.Attempt({ email }))
    } else {
      showAlert(message)
    }
    yield put(LoginEmailActions.Failure(error))
  }
}

export function * sendVerificationCode (action) {
  try {
    const { withRedirect = true, email } = action

    yield call(API.sendCode, email)
  
    if (!!withRedirect) {
      yield put(NavigationActions.push(routeNames.EmailVerificationScreen, {
        ...routeParams.transparentNavbar,
        passProps: { initialValues: { email, code: '' } }
      }))
    } else {
      showAlert('Confirmation code was re-sent to your email address')
    }
  } catch ({ message }) {
    showAlert(message)
  }
}

export function * confirmCode (action) {
  try {
    const { code, email } = action
    const response = yield call(API.confirmCode, email, code)

    yield put(GetAccessKeysActions.Attempt())
  } catch ({ message }) {
    showAlert(message)
    yield put(ConfirmCodeActions.Failure())
  }
}

export function * checkUserAuthenticated (action) {
  try {
    const response = yield call(API.getUserCredentials)
    const userId = path(['signInUserSession', 'idToken', 'payload', 'aud'], response)

    yield put(CheckUserAuthActions.Success({ userId }))
    yield put(GetAccessKeysActions.Attempt())
    startMainView()

  } catch (error) {
    try {
      const { expirationTime, accessToken, userID } = yield call(AccessToken.getCurrentAccessToken)

      if (accessToken) {
        yield call(authFacebook, accessToken)
        yield put(GetAccessKeysActions.Attempt())
      } else {
        yield put(CheckUserAuthActions.Failure())
      }
    } catch (error) {
      console.log(error)
      yield put(CheckUserAuthActions.Failure())
    }
  }
}

export function * signOut (action) {
  try {
    yield call(API.signOut)
    startApp()
    yield put(SignOutActions.Success())
  } catch (error) {
    yield call(API.faceSignOut)
    yield put(SignOutActions.Failure())
    startApp()
  }
}

export function * resetPassword (action) {
  try {
    const { email } = action

    yield call(API.resetPassword, email)
    yield put(ResetPasswordActions.Success())
    yield put(NavigationActions.push(routeNames.ChangePasswordScreen, {
      ...routeParams.transparentNavbar,
      passProps: { initialValues: { email, code: '' } }
    }))
  } catch (error) {
    showAlert(error.message)
    yield put(ResetPasswordActions.Failure())
  }
}

export function * changePassword (action) {
  const { code, password, email } = action
  try {    
    yield call(API.changePassword, email, code, password)
    yield put(NavigationActions.popToRoot())
    yield put(ChangePasswordActions.Success())
    showAlert('Password successfully changed!')
  } catch (error) {
    showAlert(error.message)
    yield put(ChangePasswordActions.Failure())
  }
}
