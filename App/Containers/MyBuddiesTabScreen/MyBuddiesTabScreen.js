import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { Images } from 'app/Themes'

import styles from './MyBuddiesTabScreenStyles'

class MyBuddiesTabScreenView extends Component {
  constructor (props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }
  
  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'menu') {
        const { navigator } = this.props
        navigator.toggleDrawer({ side: 'left' })
      }
    }
  }

  handleNavigateToMainView = () => {
    const { logIn } = this.props
    logIn({
      email: 'any@email.here',
      password: 'any*password*here',
    })
  }

  render () {
    const { goBack } = this.props

    return (
      <View style={styles.tabContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              tab 3
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = {
}

export const MyBuddiesTabScreen = connect(mapStateToProps, mapDispatchToProps)(MyBuddiesTabScreenView)
