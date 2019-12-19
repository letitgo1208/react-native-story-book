import React, { PureComponent } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Switch } from 'app/Components/SwitchComponent'

import { Colors, Fonts } from 'app/Themes'
import { Label } from 'app/Components'

import styles from './GenderGroupStyles'

export default class GenderGroup extends PureComponent {
  state = {
    value: this.props.input.value
  }

  handlePress = (value) => () => {
    const { value: stateValue } = this.state
    const { input: { onChange } } = this.props
    const valueToSet = stateValue !== value ? value : value === 'male' ? 'female' : 'male'

    this.setState({ value: valueToSet })
    onChange(valueToSet)
  }

  render () {
    const { renderSeparator, renderBoth } = this.props
    const { value: stateValue } = this.state
    return (
      <View>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={this.handlePress('male')}
        >
          <View style={styles.switchWrapper}>
            <Label
              profileTitle
              label='Male'
            />
            <Switch
              value={stateValue === 'male'}
              activeText=''
              inActiveText=''
              circleBorderWidth={2}
              width={Fonts.scale(51)}
              circleBorderColor={stateValue === 'male' ? Colors.strongViolet : Colors.borderGrayLight}
              containerStyle={stateValue === 'male' ? styles.containerStyleOn : styles.containerStyleOff}
              onValueChange={this.handlePress('male')}
              barHeight={Fonts.verticalScale(31)}
              circleSize={Fonts.verticalScale(31)}
              backgroundActive={Colors.strongViolet}
              backgroundInactive={Colors.snow}
            />
          </View>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={this.handlePress('female')}
        >
          <View style={styles.switchWrapper}>
            <Label
              profileTitle
              label='Female'
            />
            <Switch
              value={stateValue === 'female'}
              activeText=''
              inActiveText=''
              circleBorderWidth={2}
              width={Fonts.scale(51)}
              circleBorderColor={stateValue === 'female' ? Colors.strongViolet : Colors.borderGrayLight}
              containerStyle={stateValue === 'female' ? styles.containerStyleOn : styles.containerStyleOff}
              onValueChange={this.handlePress('female')}
              barHeight={Fonts.verticalScale(31)}
              circleSize={Fonts.verticalScale(31)}
              backgroundActive={Colors.strongViolet}
              backgroundInactive={Colors.snow}
            />
          </View>
          {!!renderSeparator && <View style={styles.line} />}
        </TouchableOpacity>
        {!!renderBoth &&
          <TouchableOpacity
            style={styles.itemWrapper}
            onPress={this.handlePress('both')}
          >
            <View style={styles.switchWrapper}>
              <Label
                profileTitle
                label='Both'
              />
              <Switch
                value={stateValue === 'both'}
                activeText=''
                inActiveText=''
                circleBorderWidth={2}
                width={Fonts.scale(51)}
                circleBorderColor={stateValue === 'both' ? Colors.strongViolet : Colors.borderGrayLight}
                containerStyle={stateValue === 'both' ? styles.containerStyleOn : styles.containerStyleOff}
                onValueChange={this.handlePress('both')}
                barHeight={Fonts.verticalScale(31)}
                circleSize={Fonts.verticalScale(31)}
                backgroundActive={Colors.strongViolet}
                backgroundInactive={Colors.snow}
              />
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }
}
