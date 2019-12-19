import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import NavigationActions from 'app/Navigation/NavigationActions'
import { ChangePasswordActions, AuthSelectors } from 'app/Redux/AuthRedux'
import { GradientButton, GradientInput, CodeInput } from 'app/Components'

import styles from './ChangePasswordScreenStyles'

class ChangePasswordScreenView extends Component {
  componentWillReceiveProps ({ password }) {
    const { password: prevPassword, changeField } = this.props
    if (!password && prevPassword) {
      changeField('ChangePasswordForm', 'passwordConfirm', '')
    }
  }

  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut()
  }

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
            Type new password
          </Text>

          <Field
            name='code'
            component={CodeInput}
          />

          <Field
            secureTextEntry
            name='password'
            placeholder='Password'
            component={GradientInput}
            containerStyle={styles.fieldMargin}
          />

          {!!password &&
            <Field
              secureTextEntry
              name='passwordConfirm'
              component={GradientInput}
              placeholder='Password Confirmation'
            />
          }

        </View>

        <GradientButton
          label='Change password'
          isLoading={isLoading}
          onPress={handleSubmit}
          containerStyle={styles.bottomMargin}
        />

      </ScrollView>
    )
  }
}

const validate = ({ password, passwordConfirm, code }) => {
  const errors = {}

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

  if (!code || code.length < 6) {
    errors.code = 'Code is required'
  }

  return errors
}

const mapStateToProps = state => ({
  isAuthLoading: AuthSelectors.authLoadingSelector(state),
  password: AuthSelectors.passwordSelector(state, 'ChangePasswordForm'),
})

const mapDispatchToProps = {
  onSubmit: ChangePasswordActions.Attempt,
  changeField: change,
}

const ChangePasswordScreenForm = reduxForm({
  form: 'ChangePasswordForm',
  validate
})(ChangePasswordScreenView)

export const ChangePasswordScreen = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreenForm)
