import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import { routeNames, routeParams } from 'app/Navigation/RouteConst' 
import NavigationActions from 'app/Navigation/NavigationActions'
import { SignOutActions } from 'app/Redux/AuthRedux'
import { UserSelectors } from 'app/Redux/UserRedux'
import { GradientButton, GradientAvatar } from 'app/Components'
import { Images } from 'app/Themes'

import styles, { gradient } from './DrawerMenuScreenStyles'

class DrawerMenuScreenView extends Component {
  handleNavigateToProfile = (route, params) => () => {
    const { navigateTo, toggleDrawer } = this.props
    toggleDrawer()
    navigateTo(route, params)
  }

  render () {
    const { firstName = '', lastName = '', signOut, avatar } = this.props

    return (
      <View style={[styles.mainContainer, styles.position]}>
        <View style={styles.infoContainer}>
          <View style={styles.infoWrapper}>
            <View style={styles.avatarContainer}>
              <GradientAvatar
                size={90}
                uri={avatar}
              />
            </View>
            <Text
              numberOfLines={2}
              style={styles.username}
            >
              {`${firstName}\n${lastName}`}
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={gradient}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 1 }}
          style={styles.linkContainer}
        >
          <View style={styles.topItems}>
            <TouchableOpacity>
              <Text style={styles.item}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.item}>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleNavigateToProfile(routeNames.ProfileScreen, { ...routeParams.transparentNavbar, title: 'Profile' })}
            >
              <Text style={styles.item}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.item}>Safety</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.item}>Help</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomItems}>
            <TouchableOpacity onPress={signOut}>
              <Text style={styles.item}>Log out</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  avatar: UserSelectors.userAvatarSelector(state),
  firstName: UserSelectors.userFirstNameSelector(state),
  lastName: UserSelectors.userLastNameSelector(state),
})

const mapDispatchToProps = {
  signOut: () => dispatch => dispatch(SignOutActions.Attempt()),
  navigateTo: (...props) => dispatch => dispatch(NavigationActions.push(...props)),
  toggleDrawer: () => dispatch => dispatch(NavigationActions.toggleDrawer())
}

export const DrawerMenuScreen = connect(mapStateToProps, mapDispatchToProps)(DrawerMenuScreenView)
