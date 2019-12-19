import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import NavigationActions from 'app/Navigation/NavigationActions'
import { LoginFacebookActions, LoginEmailActions, AuthSelectors } from 'app/Redux/AuthRedux'
import { UserSelectors } from 'app/Redux/UserRedux'
import { GradientButton, GradientInput, Label } from 'app/Components'
import { isEmail } from 'app/Services/Helpers'

import styles from './LoginScreenStyles'

class LoginScreenView extends Component {
  prevEmail = this.props.initialValues.email || ''

  handleOnFacebookSignInPress = () => {
    const { loginFacebook } = this.props
    loginFacebook()
  }

  handleOnForgotPasswordPress = () => {
    const { navigateTo } = this.props
    navigateTo(routeNames.ForgotPasswordScreen, routeParams.transparentNavbar)
  }

  normalizeEmail = value => {
    if (!!value && value.length < this.prevEmail.length) {
      this.props.change('password', '')
    }
    this.prevEmail = value || ''
    return value
  }

  onSubmitEditingEmail = () => this.password.getRenderedComponent().focus()

  handleRef = ref => { this.password = ref }

  render () {
    const { isAuthLoading, submitting, valid, handleSubmit } = this.props
    const isLoading = submitting || isAuthLoading

    return (
      <ScrollView
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.mainContainer}
      >
        <View style={styles.contentWrapper}>
          <Text style={[styles.titleText, styles.margin]}>
            Log in
          </Text>

          <Field
            name='email'
            placeholder='Email'
            returnKeyType='next'
            blurOnSubmit={false}
            component={GradientInput}
            normalize={this.normalizeEmail}
            containerStyle={styles.bigMargin}
            onSubmitEditing={this.onSubmitEditingEmail}
          />
          <Field
            withRef
            secureTextEntry
            name='password'
            ref={this.handleRef}
            placeholder='Password'
            component={GradientInput}
            containerStyle={styles.smallMargin}
          />

          <Label
            link
            disabled={isLoading}
            label='Forgot password'
            onPress={this.handleOnForgotPasswordPress}
          />
        </View>

        <View style={[styles.contentWrapper, styles.contentMargin]}>
          <GradientButton
            label='Log in'
            isLoading={isLoading}
            onPress={handleSubmit}
            containerStyle={styles.bottomMargin}
          />

          <Label
            link
            disabled={isLoading}
            label='Connect with Facebook'
            onPress={this.handleOnFacebookSignInPress}
          />
        </View>
      </ScrollView>
    )
  }
}

const validate = ({ email, password }) => {
  const errors = {}

  if (!email) {
    errors.email = 'Email is required'
  } else if (!isEmail(email)) {
    errors.email = 'Please correct the email'
  }

  if (!password) {
    errors.password = 'Password is required'
  } 

  return errors
}

const mapStateToProps = state => ({
  initialValues: {
    email: UserSelectors.userEmailSelector(state),
  },
  isAuthLoading: AuthSelectors.authLoadingSelector(state),
  password: AuthSelectors.formSelector(state, {
    formName: 'LoginForm',
    fieldName: 'password',
  }),
})

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  onSubmit: LoginEmailActions.Attempt,
  loginFacebook: LoginFacebookActions.Attempt,
}

const LoginScreenForm = reduxForm({
  form: 'LoginForm',
  validate
})(LoginScreenView)

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreenForm)
