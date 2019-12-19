import React, { PureComponent } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import { Colors } from 'app/Themes'
import NavigationActions from 'app/Navigation/NavigationActions'

import styles from './RightMenuStyles'

class RightMenu extends PureComponent {
  handleOnPress = () => {
    const { showLightBox } = this.props
    showLightBox(routeNames.FilterModal, routeParams.modal)
  }

  render () {
    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        style={styles.rightMenuWrapper}
      >
        <Icon name='sliders' size={30} color={Colors.fontGrayDark} />
    </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = {
  showLightBox: NavigationActions.showLightBox,
}

export default connect(null, mapDispatchToProps)(RightMenu)
