import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { path } from 'ramda'
import { createStructuredSelector } from 'reselect'

import { HangoutMarker } from 'app/Components'
import { HangoutSelectors, UpdateRegionActions, toggleUsersCardsModal } from 'app/Redux/HangoutRedux'
import { UserSelectors } from 'app/Redux/UserRedux'

import styles from './MapComponentStyles'

const initialDelta = {
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
}

class MapComponent extends PureComponent {
  state = {
    ready: false
  }

  handleMarkerPress = collection => () => this.props.showUsersCards(collection)

  renderMarker = (collection, i) =>
    <HangoutMarker
      key={i}
      {...collection}
      onPress={this.handleMarkerPress(collection)}
    />

  onMapReady = () => this.setState({ ready: true })

  render () {
    const { ready } = this.state
    const { userLocation, onRegionchange, markers } = this.props
    const initialRegion = !userLocation ? {} : { ...initialDelta, ...userLocation }

    return (
      <MapView
        style={styles.map}
        rotateEnabled={false}
        onMapReady={this.onMapReady}
        onRegionChange={onRegionchange}
      >
        {ready && markers.map(this.renderMarker)}
      </MapView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  markers: HangoutSelectors.markersSelector,
  userLocation: UserSelectors.userLocationSelector,
})

const mapDispatchToProps = {
  onRegionchange: UpdateRegionActions.Attempt,
  showUsersCards: toggleUsersCardsModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
