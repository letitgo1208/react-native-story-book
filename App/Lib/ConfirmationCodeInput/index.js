import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Dimensions, ViewPropTypes, LayoutAnimation} from 'react-native';
import _ from 'lodash';
import { Fonts } from 'app/Themes'
import Input from './Input';

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = ViewPropTypes || View.propTypes;

export default class ConfirmationCodeInput extends Component {
  static propTypes = {
    codeLength: PropTypes.number,
    compareWithCode: PropTypes.string,
    inputPosition: PropTypes.string,
    size: PropTypes.number,
    space: PropTypes.number,
    className: PropTypes.string,
    cellBorderWidth: PropTypes.number,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    ignoreCase: PropTypes.bool,
    autoFocus: PropTypes.bool,
    codeInputStyle: TextInput.propTypes.style,
    containerStyle: viewPropTypes.style,
    onFulfill: PropTypes.func.isRequired,
    onUnfulfill: PropTypes.func,
    filterInput: PropTypes.func
  };

  static defaultProps = {
    codeLength: 5,
    inputPosition: 'center',
    autoFocus: false,
    size: 40,
    className: 'border-box',
    cellBorderWidth: 1,
    activeColor: 'rgba(255, 255, 255, 1)',
    inactiveColor: 'rgba(255, 255, 255, 0.2)',
    space: 8,
    compareWithCode: '',
    ignoreCase: false
  };

  constructor(props) {
    super(props);

    this.state = {
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0,
      isFulfilled: false
    };

    this.codeInputRefs = [];
    this._onFocus = this._onFocus.bind(this);
    this._onInputCode = this._onInputCode.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
  }

  componentDidMount() {
    const {compareWithCode, codeLength, inputPosition} = this.props;
    if (compareWithCode && compareWithCode.length !== codeLength) {
      console.error('Invalid props: compareWith length is not equal to codeLength');
    }

    if (_.indexOf(['center', 'left', 'right', 'full-width'], inputPosition) === -1) {
      console.error('Invalid input position. Must be in: center, left, right, full');
    }
  }

  clear() {
    this._updateState(new Array(this.props.codeLength).fill(''), 0);
    this._setFocus(0);
  }

  _updateState(codeArr, currentIndex) {
    const {codeLength} = this.props;
    const code = codeArr.join('');
    const isFulfilled = code.length === codeLength;

    this._fulfill(code, isFulfilled);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({
      codeArr,
      currentIndex,
      isFulfilled
    });
  }

  _setFocus(index) {
    !!this.codeInputRefs[index] && this.codeInputRefs[index].focus();
  }

  _blur(index) {
    this.codeInputRefs[index].blur();
  }

  _onFocus(index) {
    const {codeArr} = this.state;
    const currentEmptyIndex = _.findIndex(codeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    const newCodeArr = codeArr.map((val, i) => (i >= index ? '' : val));

    this._updateState(newCodeArr, index);
  }

  _isMatchingCode(code, compareWithCode, ignoreCase = false) {
    if (ignoreCase) {
      return code.toLowerCase() === compareWithCode.toLowerCase();
    }
    return code === compareWithCode;
  }

  _getContainerStyle(size, position) {
    switch (position) {
      case 'left':
        return {
          justifyContent: 'flex-start',
          height: size
        };
      case 'center':
        return {
          justifyContent: 'center',
          height: size
        };
      case 'right':
        return {
          justifyContent: 'flex-end',
          height: size
        };
      default:
        return {
          justifyContent: 'space-between',
          height: size
        }
    }
  }

  _getInputSpaceStyle(space) {
    const {inputPosition} = this.props;
    switch (inputPosition) {
      case 'left':
        return {
          marginRight: space
        };
      case 'center':
        return {
          marginHorizontal: Fonts.scale(12)
        };
      case 'right':
        return {
          marginLeft: space
        };
      default:
        return {
          marginRight: 0,
          marginLeft: 0
        };
    }
  }

  _getClassStyle(className, active) {
    const {cellBorderWidth, activeColor, inactiveColor, space} = this.props;
    let classStyle = {
      ...this._getInputSpaceStyle(space),
      color: activeColor
    };

    switch (className) {
      case 'clear':
        return _.merge(classStyle, {borderWidth: 0});
      case 'border-box':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor)
        });
      case 'border-circle':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderRadius: 50,
          borderColor: (active ? activeColor : inactiveColor)
        });
      case 'border-b':
        return _.merge(classStyle, {
          borderBottomWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor),
        });
      case 'border-b-t':
        return _.merge(classStyle, {
          borderTopWidth: cellBorderWidth,
          borderBottomWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor)
        });
      case 'border-l-r':
        return _.merge(classStyle, {
          borderLeftWidth: cellBorderWidth,
          borderRightWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor)
        });
      default:
        return className;
    }
  }

  _onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const {currentIndex} = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this._setFocus(nextIndex);
    }
  }

  _fulfill(code, fulfilled) {
    const {isFulfilled} = this.state;
    const {onFulfill, onUnfulfill, compareWithCode} = this.props;
    if (isFulfilled === fulfilled) {
      // no change, do nothing
      return;
    }

    if (fulfilled) {
      if (compareWithCode) {
        const isMatching = this._isMatchingCode(code, compareWithCode, ignoreCase);
        onFulfill(isMatching, code);
        !isMatching && this.clear();
      } else {
        onFulfill(code);
      }
    } else if (onUnfulfill) {
      onUnfulfill(code);
    }
  }

  _onInputCode(text, index) {
    const {codeLength, filterInput} = this.props;
    const {codeArr} = this.state;

    if (filterInput) {
      text = filterInput(text);
    }

    const charArray = text.split('');
    let newCodeArr = [...codeArr];
    newCodeArr[index] = text;

    while (index < codeLength && charArray.length > 0) {
      newCodeArr[index++] = charArray.shift();
    }

    if (!text) {
      this._onKeyPress({nativeEvent: {key: 'Backspace'}});
    } else {
      const fulfilled = index === codeLength;
      if (fulfilled) {
        this._blur(this.state.currentIndex);
      } else {
        this._setFocus(index);
      }
    }

    this._updateState(newCodeArr, index);
  }

  render() {
    const {
      codeLength,
      codeInputStyle,
      containerStyle,
      inputPosition,
      autoFocus,
      className,
      size,
      activeColor
    } = this.props;

    const {currentIndex, codeArr} = this.state;

    const initialCodeInputStyle = {
      width: size,
      height: size
    };

    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      const id = i;
      let value = codeArr[id] ? codeArr[id].toString() : '';
      let classStyle = this._getClassStyle(className, currentIndex === id);
      codeInputs.push(
        <Input
          id={id}
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          initialCodeInputStyle={initialCodeInputStyle}
          classStyle={classStyle}
          codeInputStyle={codeInputStyle}
          activeColor={activeColor}
          inputProps={this.props}
          autoFocus={autoFocus && id === 0}
          onFocus={this._onFocus}
          value={value}
          onChangeText={this._onInputCode}
          onKeyPress={this._onKeyPress}
        />
      )
    }

    return (
      <View style={[styles.container, this._getContainerStyle(size, inputPosition), containerStyle]}>
        {codeInputs}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 20,
    alignSelf: 'stretch',
  },
  codeInput: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: 0,
  }
});
