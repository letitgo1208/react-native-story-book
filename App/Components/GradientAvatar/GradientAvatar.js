import React, { PureComponent } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Images, Fonts, Colors } from 'app/Themes'

import styles, { gradient } from './GradientAvatarStyles'

export default class GradientAvatar extends PureComponent {
  render () {
    const {onPress, disabled, uri, size = 123, backgroundColor } = this.props
    const sizeRect = Fonts.scale(size)
    const background = { backgroundColor: !!backgroundColor ? backgroundColor : Colors.background }
    const source = !!uri ? { uri, width: sizeRect - 8, height: sizeRect - 8 } : Images.manDefault

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress || disabled}
      >
        <View style={[styles.wrapper, { height: sizeRect + 20 }]}>
          <LinearGradient
            colors={gradient}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 1 }}
            style={[styles.corner, { width: sizeRect, height: sizeRect }]}
          >
            <View style={[styles.innerMask, background, { width: sizeRect - 4, height: sizeRect - 4 }]}>
              <Image
                source={source}  
                style={[styles.img, !uri && styles.defaultImg, { width: sizeRect - 8, height: sizeRect - 8 }]}
              />
              <View style={styles.fixCircleClipping}/>
            </View>
            <View style={[styles.leftMask, background]} />
            <View style={[styles.rightMask, background]} />
          </LinearGradient>
        </View>
      </TouchableOpacity>
    )
  }
}
