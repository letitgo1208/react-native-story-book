import React, { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ConfirmationCodeInput from 'app/Lib/ConfirmationCodeInput'

import { Colors, Fonts } from 'app/Themes'

import styles, { gradient } from './CodeInputStyles'

export default class CodeInput extends PureComponent {
  handleOnFullfill = code => this.props.input.onChange(code)

  handleOnUnfullfill = () => this.handleOnFullfill(false)

  handleInputPress = () => this.input._setFocus(this.input.state.currentIndex)

  handleRef = ref => { this.input = ref }

  render () {
    const { input, meta: { submitFailed, dirty, submitting, error, active } } = this.props
    const isError = !active && submitFailed && error
    const value = input.value

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.handleInputPress}>
      <View style={styles.wrapper}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
          style={styles.maskWrapper}
        />
        <View style={styles.inputWrapper}>
          <ConfirmationCodeInput
            codeLength={6}
            autoCorrect={false}
            ref={this.handleRef}
            className='border-b'
            keyboardType='numeric'
            size={Fonts.size.small}
            returnKeyType='default'
            onFulfill={this.handleOnFullfill}
            onUnfulfill={this.handleOnUnfullfill}
            codeInputStyle={styles.textInputStyle}
            activeColor={Colors.gradientAquamarine}
            inactiveColor={isError ? Colors.error : Colors.fontGrayDark}
          />
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}
