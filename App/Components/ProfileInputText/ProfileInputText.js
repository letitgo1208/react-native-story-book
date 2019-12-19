import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { Colors } from 'app/Themes'
import styles from './ProfileInputTextStyles'

export default class ProfileInputText extends PureComponent {

  render () {
    const { value, submitFailed } = this.props

    return (
      <View style={[styles.inputWrapper, submitFailed && !value && styles.error]}>
        <Text style={[styles.textInputStyle, styles.center]}>{value}</Text>
      </View>
    )
  }
}
