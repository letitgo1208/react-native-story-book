import React, { PureComponent } from 'react'
import { Easing, Animated } from 'react-native'
import { DatePicker as WheelDatePicker } from 'app/Lib/react-native-wheel-datepicker/src'

import { Metrics } from 'app/Themes'

import styles, { pickerHeight } from './DatePickerStyles'

export default class DatePicker extends PureComponent {
  height = new Animated.Value(0)
  today = new Date()
  state = {
    visible: false
  }

  constructor () {
    super()

    const year = this.today.getFullYear()
    const month = this.today.getMonth()
    const day = this.today.getDate()
    this.minDate = new Date(year - 100, month, day)
    this.maxDate = new Date(year - 18, month, day)
  }

  componentWillReceiveProps ({ meta: { touched } }) {
    const { meta: { touched: prevTouched } } = this.props
    if (touched && !prevTouched) {
      this.setState({ visible: true })
      setTimeout(() => this.animate(pickerHeight), 0)
    } else if (!touched && prevTouched) {
      this.animate(0)
    }
  }

  animate = (toValue) =>
    Animated
      .timing(
        this.height,
        {
          toValue,
          duration: 200,
          easing: Easing.ease,
        })
      .start()

  render () {
    const { visible } = this.state
    const { input: { value, onChange } } = this.props
    return (
      <Animated.View style={[styles.pickerWrapper, { height: this.height }]}>
        {visible &&
          <WheelDatePicker
            date={!!value ? new Date(value) : this.maxDate}
            mode='date'
            style={Metrics.isAndroid && styles.pickerStyle}
            textSize={Metrics.isAndroid ? 22 : 36}
            maximumDate={this.maxDate}
            minimumDate={this.minDate}
            onDateChange={onChange}
          />
        }
      </Animated.View>
    )
  }
}
