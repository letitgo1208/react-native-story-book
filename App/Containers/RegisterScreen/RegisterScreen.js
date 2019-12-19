import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { LoginFacebookActions, RegisterEmailActions, AuthSelectors } from 'app/Redux/AuthRedux'
import { GradientButton, GradientInput, Label, Checkbox } from 'app/Components'
import { isEmail, showAlert } from 'app/Services/Helpers'

import styles from './RegisterScreenStyles'

class RegisterScreenView extends Component {
  input = {}

  componentWillReceiveProps ({ password }) {
    const { password: prevPassword, changeField } = this.props
    if (!password && prevPassword) {
      changeField('RegisterForm', 'passwordConfirm', '')
    }
  }

  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut()
  }

  handleOnFacebookSignInPress = () => {
    const { loginFacebook } = this.props
    loginFacebook()
  }

  openTerms = () => showAlert('Here will be available our awesome Terms and Conditions!')

  onSubmitEditing = index => () => !!this.input[index] && this.input[index].getRenderedComponent().focus()

  handleRef = index => ref => { this.input[index] = ref }

  render () {
    const { isAuthLoading, submitting, valid, handleSubmit, password } = this.props
    const isLoading = submitting || isAuthLoading

    return (
      <ScrollView
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.mainContainer}
      >
        <View style={styles.contentWrapper}>
          <Text style={[styles.titleText, styles.margin]}>
            Create Your Account
          </Text>

          <View style={styles.fieldsWrapper}>
            <Field
              name='email'
              placeholder='Email'
              blurOnSubmit={false}
              returnKeyType='next'
              component={GradientInput}
              onSubmitEditing={this.onSubmitEditing(1)}
            />

            <Field
              withRef
              secureTextEntry
              name='password'
              blurOnSubmit={false}
              returnKeyType='next'
              placeholder='Password'
              ref={this.handleRef(1)}
              component={GradientInput}
              onSubmitEditing={this.onSubmitEditing(2)}
              containerStyle={!password && styles.fieldMargin}
            />

            {!!password &&
            <Field
              withRef
              secureTextEntry
              name='passwordConfirm'
              ref={this.handleRef(2)}
              component={GradientInput}
              placeholder='Password Confirmation'
              containerStyle={styles.smallMargin}
            />}
          </View>
        </View>

        <View style={styles.contentWrapper}>
          <GradientButton
            label='Register'
            isLoading={isLoading}
            onPress={handleSubmit}
            containerStyle={styles.bottomMargin}
          />

          <Label
            link
            disabled={isLoading}
            label='connect with Facebook'
            onPress={this.handleOnFacebookSignInPress}
          />
          
          <View style={styles.termsWrapper}>
            <Text style={styles.termsText}>
              By clicking Register you agree to our
            </Text>
            <TouchableOpacity onPress={this.openTerms}>
              <Text style={[styles.termsText, styles.decorate]}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const validate = ({ email, password, passwordConfirm }) => {
  const errors = {}

  if (!email) {
    errors.email = 'Email is required'
  } else if (!isEmail(email)) {
    errors.email = 'Invalid email format'
  }

  if (!password) {
    errors.password = 'Field is required'
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Use an uppercase'
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Use a number'
  } else if (password.length < 6) {
    errors.password = 'Use at least 6 chars'
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Field is required'
  }

  if (passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords not match'
  }

  return errors
}

const mapStateToProps = state => ({
  isAuthLoading: AuthSelectors.authLoadingSelector(state),
  password: AuthSelectors.passwordSelector(state, 'RegisterForm'),
})

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  onSubmit: RegisterEmailActions.Attempt,
  loginFacebook: LoginFacebookActions.Attempt,
  changeField: change,
}

const RegisterForm = reduxForm({
  form: 'RegisterForm',
  validate
})(RegisterScreenView)

export const RegisterScreen = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
