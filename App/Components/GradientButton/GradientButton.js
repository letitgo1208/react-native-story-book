import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SkypeIndicator } from 'react-native-indicators'
import styles, { gradient } from './GradientButtonStyles'

export default class GradientButton extends PureComponent {
  render () {
    const { label, isLoading, disabled, onPress, containerStyle } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isLoading || disabled}
        style={[styles.wrapper, containerStyle]}
        >
        <LinearGradient
          colors={gradient}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 1 }}
          style={styles.buttonWrapper}
        >
          {isLoading
          ? <SkypeIndicator color='white' />
          : <Text style={styles.label}>
            {label}
          </Text>}
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
