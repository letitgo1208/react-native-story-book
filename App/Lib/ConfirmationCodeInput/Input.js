import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

class Input extends React.PureComponent {

  inputRef = null;

  constructor() {
    super();
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
  }

  focus() {
    this.inputRef && this.inputRef.focus();
  }

blur() {
    this.inputRef && this.inputRef.blur();
  }

  handleFocus() {
    this.props.onFocus && this.props.onFocus(this.props.id)
  }

  handleChangeText(text) {
    this.props.onChangeText && this.props.onChangeText(text, this.props.id)
  }

  handleKeyPress(e) {
    this.props.onKeyPress && this.props.onKeyPress(e)
  }

  render() {
    let {initialCodeInputStyle, codeInputStyle, classStyle, activeColor, inputProps, autoFocus, value} = this.props;
    return (
      <TextInput
        ref={ref => this.inputRef = ref}
        style={[
          styles.codeInput,
          initialCodeInputStyle,
          classStyle,
          codeInputStyle
        ]}
        underlineColorAndroid="transparent"
        selectionColor={activeColor}
        keyboardType={'name-phone-pad'}
        returnKeyType={'done'}
        {...inputProps}
        autoFocus={autoFocus}
        onFocus={this.handleFocus}
        value={value}
        onChangeText={this.handleChangeText}
        onKeyPress={this.handleKeyPress}
      />
    )
  }

}

const styles = StyleSheet.create({
  codeInput: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: 0
  }
});

export default Input;
