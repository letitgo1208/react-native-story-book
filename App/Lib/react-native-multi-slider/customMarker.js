import React from 'react'
import {StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
	image: {
		height: 40,
		width : 40
	}
})

export default class CustomMarker extends React.PureComponent {
	static   propTypes: {
		pressed: PropTypes.bool,
	}

	render() {
		return (
			<Image
				style={styles.image}
				source={this.props.pressed ? require('./ruby.png') : require('./diamond.png')}
				resizeMode='contain'
			/>
		)
	}
}