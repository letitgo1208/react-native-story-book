import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import styles from './SlideNavStyles'

export default class SlideNav extends PureComponent {
  handleChangeIndex = (index) => () => {
    const { onIndexChange } = this.props
    onIndexChange(index)
  }

  render () {
    const { tabIndex } = this.props

    return (
      <View style={styles.slideButtonWrapper}>
        <TouchableOpacity
          style={styles.slideItem}
          onPress={this.handleChangeIndex(0)}
        >
          <Text style={[styles.slideText, tabIndex === 0 && styles.bold]}>List</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.slideItem}
          onPress={this.handleChangeIndex(1)}
        >
          <Text style={[styles.slideText, tabIndex === 1 && styles.bold]}>Map</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
