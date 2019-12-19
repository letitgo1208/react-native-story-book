import React, { PureComponent } from 'react'
import { TextInput, View, Text } from 'react-native'
import { Colors } from 'app/Themes'
import styles from './MultilineInputStyles'

export default class MultilineInput extends PureComponent {
  render () {
    const { input, maxLength, placeholder, style, meta: { submitFailed, dirty, submitting, error, active },
      disabled, keyboardType
    } = this.props
    const isError = !active && submitFailed && error
    const value = !!input.value && input.value || ''

    return (
      <View style={[styles.inputWrapper, isError && styles.error]}>
        <TextInput
          {...input}
          multiline
          maxLength={140}
          numberOfLines={6}
          disabled={submitting}
          keyboardType={keyboardType}
          value={isError ? '' : value}
          underlineColorAndroid='transparent'
          placeholder={isError || placeholder}
          placeholderTextColor={isError ? Colors.error : Colors.fontGrayVeryLight}
          style={[styles.textInputStyle, !!style && style]}
        />
        <Text style={styles.counter}>{140 - value.length}</Text>
      </View>
    )
  }
}
