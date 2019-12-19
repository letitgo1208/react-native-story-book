import { Platform } from 'react-native'
import { Auth, API, Storage } from 'aws-amplify'
import awsmobile from 'app/Config/aws-exports'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

Auth.configure(awsmobile)

const normalizeEmail = email => {
  const splittedEmail = email.toLowerCase().split('@')
  return `${splittedEmail[0]}-${splittedEmail[1]}`
}

const signUp = async (password, email) => 
  await Auth.signUp(normalizeEmail(email), password, email)

const logIn = async (password, email) =>
  await Auth.signIn(normalizeEmail(email), password)

const sendCode = async (email) =>
  await Auth.resendSignUp(normalizeEmail(email))

const confirmCode = async (email, code) =>
  await Auth.confirmSignUp(normalizeEmail(email), code)

const loginFacebook = async () =>
  await LoginManager.logInWithReadPermissions(['public_profile', 'email'])

const getAccessTokenData = async () =>
  await AccessToken.getCurrentAccessToken()

const getGraphRequest = () =>
  new Promise((resolve, reject) => {
    const infoRequest = new GraphRequest(
      '/me?fields=first_name,last_name,email,birthday,gender',
      null,
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  })

const getUserCredentials = async () =>
  await Auth.currentAuthenticatedUser()

const signOut = async () =>
  await Auth.signOut()

const faceSignOut = async () => 
  await LoginManager.logOut()

const resetPassword = async (email) =>
  await Auth.forgotPassword(normalizeEmail(email))

const changePassword = async (email, code, password) =>
  await Auth.forgotPasswordSubmit(normalizeEmail(email), code, password)

const facebookSignIn = async (accessToken, expiresIn, userId) =>
  await Auth.federatedSignIn('facebook', {
    token: accessToken,
    expires_at: expiresIn
  }, userId)

//const getItem = (id, type) => API.get()

export default {
  getAccessTokenData,
  getUserCredentials,
  getGraphRequest,
  changePassword,
  resetPassword,
  loginFacebook,
  faceSignOut,
  confirmCode,
  sendCode,
  signOut,
  signUp,
  logIn
}
