import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import NavigationActions from 'app/Navigation/NavigationActions'
import { ResetPasswordActions, AuthSelectors } from 'app/Redux/AuthRedux'
import { UserSelectors } from 'app/Redux/UserRedux'
import { GradientButton, GradientInput, Label } from 'app/Components'
import { isEmail } from 'app/Services/Helpers'

import styles from './ForgotPasswordScreenStyles'

class ForgotPasswordScreenView extends Component {
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
            Forgot the password?
          </Text>

          <Field
            name='email'
            placeholder='Email'
            component={GradientInput}
            containerStyle={styles.marginSmall}
          />

          <Label
            smallLabel
            label={`We know, it's easily forgotten - just type\nyour registered email to reset it.`}
          />
        </View>

        <GradientButton
          label='Reset password'
          isLoading={isLoading}
          onPress={handleSubmit}
          containerStyle={styles.bottomMargin}
        />
      </ScrollView>
    )
  }
}

const validate = ({ email }) => {
  const errors = {}

  if (!email) {
    errors.email = 'Email is required'
  } else if (!isEmail(email)) {
    errors.email = 'Please correct the email'
  }

  return errors
}

const mapStateToProps = state => ({
  isAuthLoading: AuthSelectors.authLoadingSelector(state),
  initialValues: {
    email: UserSelectors.userEmailSelector(state),
  },
})

const mapDispatchToProps = {
  onSubmit: ResetPasswordActions.Attempt,
}

const ForgotPasswordScreenForm = reduxForm({
  form: 'ForgotPasswordForm',
  validate
})(ForgotPasswordScreenView)

export const ForgotPasswordScreen = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreenForm)
