import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import NavigationActions from 'app/Navigation/NavigationActions'
import { LoginFacebookActions } from 'app/Redux/AuthRedux'
import { GradientButton } from 'app/Components'
import { Images } from 'app/Themes'

import styles from './LaunchScreenStyles'

class LaunchScreenView extends Component {
  constructor (props) {
    super(props)
    NavigationActions.setNavigator(props.navigator)
  }

  handleOnLoginPress = () => {
    const { navigateTo } = this.props
    navigateTo(routeNames.LoginScreen, routeParams.transparentNavbar)
  }

  handleOnRegisterPress = () => {
    const { navigateTo } = this.props
    navigateTo(routeNames.RegisterScreen, routeParams.transparentNavbar)
  }

  render () {
    return (
      <View style={[styles.mainContainer, styles.background]}>
        <Image source={Images.topLaunchImage} style={styles.topImage} />
        <Text style={styles.text}>{'Connect\nMake friends\nHave fun'}</Text>
        <Image source={Images.centerLaunchImage} style={styles.centerImage} />

        <GradientButton
          label='Log in'
          onPress={this.handleOnLoginPress}
          containerStyle={styles.buttonMargin}
        />
        <View style={styles.marginSmall} />
        <GradientButton
          label='Sign up'
          onPress={this.handleOnRegisterPress}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  onSubmit: LoginFacebookActions.Attempt,
}

export const LaunchScreen = connect(mapStateToProps, mapDispatchToProps)(LaunchScreenView)
