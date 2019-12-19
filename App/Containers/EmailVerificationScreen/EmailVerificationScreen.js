import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import NavigationActions from 'app/Navigation/NavigationActions'
import { ConfirmCodeActions, SendVerifyCodeActions, AuthSelectors } from 'app/Redux/AuthRedux'
import { GradientButton, CodeInput, Label } from 'app/Components'

import styles from './EmailVerificationScreenStyles'

class EmailVerificationScreenView extends Component {
  handleResentCode = () => {
    const { sentCode, initialValues: { email } } = this.props
    sentCode({
      email,
      withRedirect: false,
    })
  } 

  render () {
    const { isAuthLoading, submitting, valid, handleSubmit, initialValues: { email } } = this.props
    const isLoading = submitting || isAuthLoading

    return (
      <ScrollView
        keyboardDismissMode='on-drag'
        contentContainerStyle={[styles.mainContainer, styles.wrapper]}
      >
        <View style={[styles.contentWrapper, styles.wrapperMargin]}>

          <Text style={[styles.titleText, styles.margin]}>
            Confirmation code
          </Text>

          <Field
            name='code'
            component={CodeInput}
          />
          
          <Label
            smallLabel
            style={styles.labelMargin}
            label={`We've sent a 6-digit verification code to\n${email}`}
          />

          <Label
            link
            label='Re-send code'
            onPress={this.handleResentCode}
          />
        </View>

        <GradientButton
          label='Confirm'
          isLoading={isLoading}
          onPress={handleSubmit}
          containerStyle={styles.bottomMargin}
        />
      </ScrollView>
    )
  }
}

const validate = ({ code }) => {
  const errors = {}

  if (!code || code.length < 6) {
    errors.code = 'Code is required'
  }

  return errors
}

const mapStateToProps = (state, props) => ({
  isAuthLoading: AuthSelectors.authLoadingSelector(state),
})

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  sentCode: SendVerifyCodeActions.Attempt,
  onSubmit: ConfirmCodeActions.Attempt,
}

const EmailVerificationScreenForm = reduxForm({
  form: 'EmailVerificationForm',
  validate,
})(EmailVerificationScreenView)

export const EmailVerificationScreen = connect(mapStateToProps, mapDispatchToProps)(EmailVerificationScreenForm)
