import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { Images } from 'app/Themes'

import styles from './ActivityTabScreenStyles'

class ActivityTabScreenView extends Component {
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

  render () {
    const { goBack } = this.props

    return (
      <View style={styles.tabContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              tab 2
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

export const ActivityTabScreen = connect(mapStateToProps, mapDispatchToProps)(ActivityTabScreenView)
