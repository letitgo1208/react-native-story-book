import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import MultiSlider from 'app/Lib/react-native-multi-slider/Slider'

import { Colors, Fonts, Images } from 'app/Themes'

import styles from './SliderStyles'

class CustomMarker extends PureComponent {
	render () {
    const { value, max, min } = this.props

    return (
      <View style={styles.markerContainer}>
        <Text style={styles.label}>
          {`${value}${max === 60 && value >= 60 ? '+' : ''}`}
        </Text>
        <Image
          style={styles.image}
          source={Images.sliderMarker}
        />
      </View>
		)
	}
}

export default class SliderInput extends PureComponent {
  render () {
    const { input: { value, onChange }, min, max, step = 1, renderSeparator, onValuesChangeFinish, onValuesChangeStart } = this.props

    return (
      <View style={styles.sliderWrapper}>
        <MultiSlider
          min={min}
          max={max}
          step={step}
          values={value}
          onValuesChange={onChange}
          customMarker={CustomMarker}
          sliderLength={Fonts.scale(260)}
          onValuesChangeStart={onValuesChangeStart}
          onValuesChangeFinish={onValuesChangeFinish}
        />
      </View>
    )
  }
}
