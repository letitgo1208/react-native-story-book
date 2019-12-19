import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { Images } from 'app/Themes'
import NavigationActions from 'app/Navigation/NavigationActions'

import styles from './LeftMenuStyles'

class LeftMenu extends PureComponent {
  handleHamburger = () => {
    const { toggleDrawer } = this.props
    toggleDrawer()
  }

  render () {
    return (
      <TouchableOpacity
        style={styles.leftMenuWrapper}
        onPress={this.handleHamburger}
      >
        <Image source={Images.menuIcon} />
    </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = {
  toggleDrawer: NavigationActions.toggleDrawer,
}

export default connect(null, mapDispatchToProps)(LeftMenu)
