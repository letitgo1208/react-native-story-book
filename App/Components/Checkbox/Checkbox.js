import React, { PureComponent } from 'react'
import { View, LayoutAnimation, Text, TouchableOpacity } from 'react-native'
import { CheckBox as ElementsCheckbox } from 'react-native-elements'
import { Fonts, Colors } from 'app/Themes'
import styles from './CheckboxStyles'

export default class Checkbox extends PureComponent {
  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut()
  }

  onPress = () => {
    const { input: { value, onChange } } = this.props
    onChange(!value)
  }

  render () {
    const { input, label } = this.props
    return (
      <View style={styles.wrapper}>
        <ElementsCheckbox
          center
          {...input}
          title={label}
          checkedIcon='check'
          checked={input.value}
          onPress={this.onPress}
          textStyle={styles.textStyle}
          iconType='ionicon'
          checkedColor={Colors.fontVioletDark}
          uncheckedColor={Colors.fontGray}
          containerStyle={styles.containerStyle}
          checkedIcon='md-checkmark'
          uncheckedIcon='ios-square-outline'
        />
        <TouchableOpacity>
          <Text style={[styles.textStyle, styles.bold]}>terms and conditions</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
