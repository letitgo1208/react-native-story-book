import React, { PureComponent } from 'react'
import { TextInput, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Entypo'
import LinearGradient from 'react-native-linear-gradient'
import { Label } from '../Label'
import { Colors } from 'app/Themes'
import styles, { gradient } from './GradientInputStyles'

export default class GradientInput extends PureComponent {
  state = {
    passwordVisible: false
  }

  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut()
  }

  togglePasswordVisibility = () => {
    const { passwordVisible } = this.state
    this.setState({ passwordVisible: !passwordVisible })
  }

  focus = () => this.input.focus()

  handleRef = ref => { this.input = ref }

  render () {
    const { passwordVisible } = this.state
    const {
      input, maxLength, placeholder, normalize, center, style, containerStyle,
      meta: { submitFailed, dirty, submitting, error, active }, blurOnSubmit = true,
      disabled, label, secureTextEntry, keyboardType, returnKeyType, onSubmitEditing
    } = this.props

    const isError = !active && submitFailed && error

    return (
      <View style={[styles.wrapper, containerStyle]}>

        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
          style={styles.maskWrapper}
        />

        <View style={[styles.inputWrapper, isError && styles.error]}>

          <TextInput
            {...input}
            ref={this.handleRef}
            autoCapitalize='none'
            disabled={submitting}
            keyboardType={keyboardType}
            blurOnSubmit={blurOnSubmit}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            value={isError ? '' : input.value}
            underlineColorAndroid='transparent'
            placeholder={isError || placeholder}
            maxLength={!!maxLength ? maxLength : 100}
            normalize={!!normalize ? normalize : v => v}
            secureTextEntry={!isError && !passwordVisible && !!secureTextEntry}
            placeholderTextColor={isError ? Colors.error : Colors.fontGrayVeryLight}
            style={[styles.textInputStyle, center && styles.center, !!style && style]}
          />

          {!!input.value && secureTextEntry &&
            <TouchableOpacity
              style={styles.icon}
              onPress={this.togglePasswordVisibility}
            >
              <Icon
                size={20}
                style={styles.marginRight}
                color={Colors.gradientAquamarine}
                name={passwordVisible ? 'eye-with-line' : 'eye'}
              />
            </TouchableOpacity>
          }

        </View>

      </View>
    )
  }
}
