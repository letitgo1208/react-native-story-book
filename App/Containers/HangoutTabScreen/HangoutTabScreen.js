import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Animated, Platform } from 'react-native'
import { connect } from 'react-redux'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { Images, Metrics } from 'app/Themes'
import { UpdateUserLocationActions } from 'app/Redux/UserRedux'
import { SlideNav, LeftMenu, MapComponent, ListComponent, RightMenu, UsersMarkersCard } from 'app/Components'

import styles from './HangoutTabScreenStyles'

class HangoutTabScreenView extends Component {
  state = {
    tabIndex: 1,
  }

  left = new Animated.Value(0)

  constructor (props) {
    super(props)
    const { navigator, isProfileCompleted, navigateTo } = props
    NavigationActions.setNavigator(navigator)
    navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  componentDidMount () {
    // setTimeout(this.updateUserLocation, 2000)
  }

  updateUserLocation = () => {
    const { geolocation } = navigator
    Platform.OS === 'ios' && geolocation.requestAuthorization()
    geolocation.getCurrentPosition(this.handleLocation)
  }

  handleLocation = ({ coords }) => {
    const { updateUserLocation } = this.props
    updateUserLocation(coords)
  }

  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'menu') {
        const { navigator, navigateTo } = this.props
        navigator.toggleDrawer({ side: 'left' })
      }
    }
  }

  animate = (toValue) =>
    Animated.timing(
      this.left,
      {
        duration: 300,
        toValue
      }
    ).start()

  handleIndexChange = (tabIndex) => {
    this.setState({ tabIndex })
    if (tabIndex === 0 && tabIndex !== this.state.tabIndex) {
      this.animate(-Metrics.screenWidth)
    } else {
      this.animate(0)
    }
  }

  handleSwipeRef = (ref) => { this.swiper = ref }

  showUsersCard = () => {

  }

  render () {
    const { tabIndex } = this.state
    const { goBack } = this.props
    
    return (
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.container, { left: this.left }]}>
          <ListComponent />
          <MapComponent showUsersCard={this.showUsersCard} />
        </Animated.View>
        <SlideNav
          tabIndex={tabIndex}
          onIndexChange={this.handleIndexChange}
        />
        <LeftMenu />
        <RightMenu />
        <UsersMarkersCard />
      </View>
    )
  }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  updateUserLocation: UpdateUserLocationActions.Attempt,
}

export const HangoutTabScreen = connect(mapStateToProps, mapDispatchToProps)(HangoutTabScreenView)
