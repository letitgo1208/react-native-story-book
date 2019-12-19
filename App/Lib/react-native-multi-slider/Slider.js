import React from 'react'
import {
	StyleSheet,
	PanResponder,
	View,
	TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'

import converter from './converter'
import mockProps from './mockProps'


const sliderProps = {
	values: PropTypes.arrayOf(PropTypes.number),

	onValuesChange      : PropTypes.func,
	onValuesChangeFinish: PropTypes.func,

	sliderLength     : PropTypes.number,
	sliderOrientation: PropTypes.string,
	touchDimensions  : PropTypes.object,

	customMarker: PropTypes.func,

	min : PropTypes.number,
	max : PropTypes.number,
	step: PropTypes.number,

	optionsArray: PropTypes.array,
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	fullTrack: {
		flexDirection: 'row',
		paddingTop: 40,
	},
	track    : {
		justifyContent: 'center'
	},
	touch    : {
		justifyContent : 'center',
		alignItems     : 'center',
		backgroundColor: 'transparent'
	}
})


export default class Slider extends React.PureComponent {
	static propTypes = sliderProps

	static defaultProps = mockProps

	constructor(props) {
		super(props)

		this.optionsArray = props.optionsArray || converter.createArray(props.min, props.max, props.step)
		this.stepLength = props.sliderLength / this.optionsArray.length

		const initialValues = props.values.map(value => converter.valueToPosition(value, this.optionsArray, props.sliderLength))

		this.state = {
			pressedOne : true,
			valueOne   : props.values[0],
			valueTwo   : props.values[1],
			pastOne    : initialValues[0],
			pastTwo    : initialValues[1],
			positionOne: initialValues[0],
      positionTwo: initialValues[1],
      twoPressed: false,
		}
	}

	componentWillMount() {
		const customPanResponder = (start, move, end) => {
			return PanResponder.create({
				onStartShouldSetPanResponder       : (evt, gestureState) => true,
				onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
				onMoveShouldSetPanResponder        : (evt, gestureState) => true,
				onMoveShouldSetPanResponderCapture : (evt, gestureState) => true,
				onPanResponderGrant                : (evt, gestureState) => start(),
				onPanResponderMove                 : (evt, gestureState) => move(gestureState),
				onPanResponderTerminationRequest   : (evt, gestureState) => false,
				onPanResponderRelease              : (evt, gestureState) => end(gestureState),
				onPanResponderTerminate            : (evt, gestureState) => end(gestureState),
				onShouldBlockNativeResponder       : (evt, gestureState) => true
			})
		}

		this._panResponderOne = customPanResponder(this.startOne, this.moveOne, this.endOne)
		this._panResponderTwo = customPanResponder(this.startTwo, this.moveTwo, this.endTwo)

	}

	componentWillReceiveProps(nextProps) {
		var {values} = this.props
		if (nextProps.values.join() !== values.join()) {
			this.set(nextProps)
		}
	}

	set(config) {
		var {max, min, optionsArray, step, values} = config || this.props
		this.optionsArray = optionsArray || converter.createArray(min, max, step)
		this.stepLength = this.props.sliderLength / this.optionsArray.length

		var initialValues = values.map(value => converter.valueToPosition(value, this.optionsArray, this.props.sliderLength))

		this.setState({
			pressedOne : true,
			valueOne   : values[0],
			valueTwo   : values[1],
			pastOne    : initialValues[0],
			pastTwo    : initialValues[1],
			positionOne: initialValues[0],
			positionTwo: initialValues[1]
		})
	}

	startOne = () => {
		this.props.onValuesChangeStart()
		this.setState({
			onePressed: !this.state.onePressed
		})
	}

	startTwo = () => {
		this.props.onValuesChangeStart()
		this.setState({
			twoPressed: !this.state.twoPressed
		})
	}

	moveOne = (gestureState) => {
		var unconfined = Math.floor(gestureState.moveX - 40)
		var bottom = 0
		var top = (this.state.positionTwo - this.stepLength) || this.props.sliderLength
		var confined = unconfined < bottom ? bottom : (unconfined > top ? top : unconfined)
		var value = converter.positionToValue(this.state.positionOne, this.optionsArray, this.props.sliderLength)

    var slipDisplacement = this.props.touchDimensions.slipDisplacement

		if (Math.abs(gestureState.dy) < slipDisplacement || !slipDisplacement) {
			this.setState({
				positionOne: confined
			})
		}
		if (value !== this.state.valueOne) {
			this.setState({
				valueOne: value
			}, function () {
				var change = [this.state.valueOne]
				if (this.state.valueTwo) {
					change.push(this.state.valueTwo)
				}
				this.props.onValuesChange(change)
			})
		}
	}

	moveTwo = (gestureState) => {
		var unconfined = Math.floor(gestureState.moveX - 40)
		var bottom = this.state.positionOne + this.stepLength
		var top = this.props.sliderLength
		var confined = unconfined < bottom ? bottom : (unconfined > top ? top : unconfined)
		var value = converter.positionToValue(this.state.positionTwo, this.optionsArray, this.props.sliderLength)
		var slipDisplacement = this.props.touchDimensions.slipDisplacement

		if (Math.abs(gestureState.dy) < slipDisplacement || !slipDisplacement) {
			this.setState({
				positionTwo: confined
			})
		}
		if (value !== this.state.valueTwo) {
			this.setState({
				valueTwo: value
			}, function () {
				this.props.onValuesChange([this.state.valueOne, this.state.valueTwo])
			})
		}
	}

	endOne = (gestureState) => {
		this.setState({
			pastOne   : this.state.positionOne,
			onePressed: !this.state.onePressed
		}, function () {
			var change = [this.state.valueOne]
			if (this.state.valueTwo) {
				change.push(this.state.valueTwo)
			}
			this.props.onValuesChangeFinish(change)
		})
	}

	endTwo = (gestureState) => {
		this.setState({
			twoPressed: !this.state.twoPressed,
			pastTwo   : this.state.positionTwo,
		}, function () {
			this.props.onValuesChangeFinish([this.state.valueOne, this.state.valueTwo])
		})
	}

	render() {
		var {positionOne, positionTwo} = this.state
		var {selectedStyle, unselectedStyle, sliderLength, max, min} = this.props
		var twoMarkers = positionTwo

		var fixedPositionOne = Math.floor(positionOne / this.stepLength) * this.stepLength
		var fixedPositionTwo = Math.floor(positionTwo / this.stepLength) * this.stepLength

		var trackOneLength = fixedPositionOne
		var trackOneStyle = twoMarkers ? unselectedStyle : selectedStyle
		var trackThreeLength = twoMarkers ? sliderLength - (fixedPositionTwo) : 0
		var trackThreeStyle = unselectedStyle
		var trackTwoLength = sliderLength - trackOneLength - trackThreeLength
		var trackTwoStyle = twoMarkers ? selectedStyle : unselectedStyle
		var Marker = this.props.customMarker
		var {top, slipDisplacement, height, width, borderRadius} = this.props.touchDimensions
		var touchStyle = {
			top         : top || -10,
			height      : height,
			width       : width,
			borderRadius: borderRadius || 0
		}

		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<View style={[styles.fullTrack, {width: sliderLength}]}>
					<View style={[this.props.trackStyle, styles.track, trackOneStyle, {width: trackOneLength}]}/>
					<View style={[this.props.trackStyle, styles.track, trackTwoStyle, {width: trackTwoLength}]}/>
					{twoMarkers && (
						<View
							style={[this.props.trackStyle, styles.track, trackThreeStyle, {width: trackThreeLength}]}/>
					)}


					<View
						style={[styles.touch, touchStyle, {left: -(trackTwoLength + trackThreeLength + width / 2)}]}
						ref={component => this._markerOne = component}
						{...this._panResponderOne.panHandlers}
					>
						<Marker
							min={min}
							pressed={this.state.onePressed}
							value={this.state.valueOne}
							markerStyle={this.props.markerStyle}
							pressedMarkerStyle={this.props.pressedMarkerStyle}
						/>
					</View>

					{twoMarkers && (positionOne !== this.props.sliderLength) && (
						<View
							style={[styles.touch, touchStyle, {left: -(trackThreeLength + width * 1.5)}]}
							ref={component => this._markerTwo = component}
							{...this._panResponderTwo.panHandlers}
						>
							<Marker
								max={max}
								pressed={this.state.twoPressed}
								value={this.state.valueTwo}
								markerStyle={this.props.markerStyle}
								pressedMarkerStyle={this.props.pressedMarkerStyle}
							/>
						</View>
					)}

				</View>
			</View>
		)
	}
}