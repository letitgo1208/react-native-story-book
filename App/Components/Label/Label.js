import React, { PureComponent } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './LabelStyles'

export default class Label extends PureComponent {
  render () {
    const {
      link, smallLabel, medium, label, onPress, disabled, bigLink, style,
      profileTitle, profileSubitle,
    } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress || disabled}
        style={styles.wrapper}
      >
        <Text style={[
          styles.label,
          link && styles.link,
          smallLabel && styles.smallLabel,
          medium && styles.medium,
          bigLink && styles.bigLink,
          profileTitle && styles.profileTitle,
          profileSubitle && styles.profileSubitle,
          style,
        ]}
        >{label}</Text>
      </TouchableOpacity>
    )
  }
}
