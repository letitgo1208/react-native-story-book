import React, { PureComponent } from 'react'
import { Image, View, Text } from 'react-native'
import { Marker } from 'react-native-maps'

import styles from './HangoutMarkerStyles'

export default class HangoutMarker extends PureComponent {
  render () {
    const { mainMarker: { position, imgUrl }, collected, onPress } = this.props
    const length = collected.length + 1

    return (
      <Marker
        onPress={onPress}
        coordinate={position}
      >
        <Image source={{ uri: imgUrl }} style={styles.avatar} />
        {length > 1 && 
          <View style={styles.badge}>
            <Text style={styles.text}>{length}</Text>
          </View>}
      </Marker>
    )
  }
}
