import React, { PureComponent } from 'react'
import { TextInput, View } from 'react-native'
import { Colors } from 'app/Themes'
import styles from './ProfileInputStyles'

export default class ProfileInput extends PureComponent {
  componentWillReceiveProps ({ meta: { active } }) {
    const { meta: { active: prevActive } } = this.props
    if (!prevActive && active) {
      this.input.focus()
    }
  }

  handleRef = ref => { this.input = ref }

  focus = () => this.input.focus()

  render () {
    const { input, maxLength, placeholder, center, style, containerStyle, returnKeyType,
      meta: { submitFailed, dirty, submitting, error, active }, blurOnSubmit,
      disabled, label, keyboardType, numberOfLines, autoCapitalize, onSubmitEditing,
    } = this.props
    const isError = !active && submitFailed && error

    return (
      <View style={[styles.inputWrapper, isError && styles.error, !!containerStyle && containerStyle]}>
        <TextInput
          {...input}
          ref={this.handleRef}
          blurOnSubmit={blurOnSubmit}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          numberOfLines={numberOfLines}
          disabled={submitting || disabled}
          onSubmitEditing={onSubmitEditing}
          value={isError ? '' : input.value}
          underlineColorAndroid='transparent'
          placeholder={isError || placeholder}
          maxLength={!!maxLength ? maxLength : 100}
          multiline={!!numberOfLines && numberOfLines > 1}
          autoCapitalize={!!autoCapitalize ? autoCapitalize : 'none'}
          placeholderTextColor={isError ? Colors.error : Colors.fontGrayVeryLight}
          style={[styles.textInputStyle, center && styles.center, !!style && style]}
        />
      </View>
    )
  }
}
