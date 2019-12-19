import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	PanResponder,
	TouchableWithoutFeedback,
	ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Metrics } from 'app/Themes'

export class Switch extends Component {
	static propTypes = {
		onValueChange: PropTypes.func,
		disabled: PropTypes.bool,
		activeText: PropTypes.string,
		inActiveText: PropTypes.string,
		backgroundActive: PropTypes.string,
		backgroundInactive: PropTypes.string,
		value: PropTypes.bool,
		circleActiveColor: PropTypes.string,
		circleInActiveColor: PropTypes.string,
		circleSize: PropTypes.number,
    circleBorderColor: PropTypes.string,
		activeTextStyle: Text.propTypes.style,
		inactiveTextStyle: Text.propTypes.style,
		containerStyle: ViewPropTypes.style,
		barHeight: PropTypes.number,
		circleBorderWidth: PropTypes.number
	};

	static defaultProps = {
		value: false,
		onValueChange: () => null,
		disabled: false,
		activeText: 'On',
		inActiveText: 'Off',
		backgroundActive: 'green',
		backgroundInactive: 'gray',
		circleActiveColor: 'white',
		circleInActiveColor: 'white',
    circleBorderColor: 'rgb(100, 100, 100)',
		circleSize: 30,
		barHeight: null,
		circleBorderWidth: 1
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			value: props.value,
			transformSwitch: new Animated.Value(Metrics.isAndroid
				? props.value ? -Fonts.scale(12.5) : -Fonts.scale(33)
				: Fonts.scale(props.value ? -10 : -32)
			),
			backgroundColor: new Animated.Value(props.value ? 75 : -75),
			circleColor: new Animated.Value(props.value ? 75 : -75)
		};

		this.handleSwitch = this.handleSwitch.bind(this);
		this.animateSwitch = this.animateSwitch.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { disabled } = this.props;
		if (nextProps.value === this.props.value) {
			return;
		}
		if (disabled) {
			return;
		}

		this.animateSwitch(nextProps.value, () => {
			this.setState({ value: nextProps.value });
		});
	}

	handleSwitch() {
		const { value } = this.state;
		const { onValueChange, disabled } = this.props;
		if (disabled) {
			return;
		}
		onValueChange(value)

		this.animateSwitch(!value, () => {
			this.setState({ value: !value });
		});
	}

	animateSwitch(value, cb = () => { }) {
		Animated.parallel([
			Animated.spring(this.state.transformSwitch, {
				friction: 8,
				toValue: Fonts.scale(Metrics.isAndroid
					? value ? -Fonts.scale(11) : -Fonts.scale(29)
					: value ? -10 : -32
				)
			}),
			Animated.timing(this.state.backgroundColor, {
				toValue: value ? 75 : -75,
				duration: 200
			}),
			Animated.timing(this.state.circleColor, {
				toValue: value ? 75 : -75,
				duration: 200
			})
		]).start(cb);
	}

	render() {
		const {
			transformSwitch,
			backgroundColor,
			circleColor,
		} = this.state;

		const {
			backgroundActive,
			backgroundInactive,
			circleActiveColor,
			circleInActiveColor,
			activeText,
			inActiveText,
			circleSize,
			containerStyle,
			activeTextStyle,
			inactiveTextStyle,
			barHeight,
      circleBorderColor,
			circleBorderWidth,
			width
		} = this.props;

		const interpolatedColorAnimation = backgroundColor.interpolate({
			inputRange: [-75, 75],
			outputRange: [backgroundInactive, backgroundActive]
		});

		const interpolatedCircleColor = circleColor.interpolate({
			inputRange: [-75, 75],
			outputRange: [circleInActiveColor, circleActiveColor]
		});

    return (
			<TouchableWithoutFeedback
						onPress={this.handleSwitch}
			>
				<Animated.View
					style={[
						styles.container,
						containerStyle,
						{ backgroundColor: interpolatedColorAnimation, width, height: barHeight ? barHeight : circleSize, borderRadius: circleSize, }
					]}
				>
					<Animated.View
						style={[
							styles.animatedContainer,
							{ left: transformSwitch, width },
						]}
					>
						<Text style={[styles.text, styles.paddingRight, activeTextStyle]}>
							{activeText}
						</Text>
						<Animated.View style={[styles.circle, { borderWidth: circleBorderWidth, borderColor: circleBorderColor, backgroundColor: interpolatedCircleColor, width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]} />
						<Text style={[styles.text, styles.paddingLeft, inactiveTextStyle]}>
							{inActiveText}
						</Text>
					</Animated.View>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}
// 51 / 31

const styles = StyleSheet.create({
	container: {
		height: 30,
		borderRadius: 30,
		width: 80,
		paddingHorizontal: 25,
		backgroundColor: 'black',
		// overflow: 'hidden'
	},
	animatedContainer: {
		flex: 1,
		width: 78,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'white',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent'
	},
	paddingRight: {
		paddingRight: 5
	},
	paddingLeft: {
		paddingLeft: 5,
	}
});