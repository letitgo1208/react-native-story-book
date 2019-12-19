import React, { PureComponent } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Switch } from 'app/Components/SwitchComponent'

import { Colors, Fonts } from 'app/Themes'
import { Label } from 'app/Components'

import styles from './SwitchStyles'

export default class SwitchInput extends PureComponent {
  state = {
    value: this.props.input.value
  }

  handlePress = () => {
    const { input: { onChange, value } } = this.props
    onChange(!value)
    this.setState({ value: !value })
  }

  render () {
    const { value: stateValue } = this.state
    const { input: { value }, label, renderSeparator } = this.props

    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={this.handlePress}
      >
        <View style={styles.switchWrapper}>
          <Label
            profileTitle
            label={label}
            style={styles.label}
          />
            <Switch
              value={value}
              activeText=''
              inActiveText=''
              circleBorderWidth={2}
              width={Fonts.scale(52)}
              circleBorderColor={stateValue ? Colors.strongViolet : Colors.borderGrayLight}
              onValueChange={this.handlePress}
              containerStyle={stateValue === 'male' ? styles.containerStyleOn : styles.containerStyleOff}
              barHeight={Fonts.verticalScale(31)}
              circleSize={Fonts.verticalScale(31)}
              backgroundActive={Colors.strongViolet}
              backgroundInactive={Colors.snow}
            />
          </View>
        {!!renderSeparator && <View style={styles.line} />}
      </TouchableOpacity>
    )
  }
}
