import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import Carousel from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import moment from 'moment'

import { HangoutSelectors, toggleUsersCardsModal } from 'app/Redux/HangoutRedux'
import { Switch, Label, GenderGroup, Slider, GradientButton } from 'app/Components'
import { UserSelectors } from 'app/Redux/UserRedux'
import { Metrics, Fonts, Colors } from 'app/Themes'

import styles from './UsersMarkersCardStyles'

class UsersMarkersCardView extends Component {
  state = {
    visible: false
  }
 
  componentWillReceiveProps ({ data }) {
    const { data: prevData } = this.props
    if (!prevData && data) {
      this.setState({ visible: true })
    }
  }

  parseUri = (uri) => !!uri ? { uri, width: 150, height: 150 } : Images.manDefault

  parseBirthDate = birthDate => moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years')

  handleCardRef = ref => { this.card = ref }

  onOutPress = () => {
    this.card.fadeOutDown()
    setTimeout(() => {
      this.setState({ visible: false })
      setTimeout(this.props.onOutPress, 0)
    }, 300)
  }

  renderItem = ({ item: { imgUrl, name, birthDate, activityId, location } }) => {
    const { userLocation } = this.props
    return (
      <View style={styles.itemWrapper}>
        <Image
          source={this.parseUri(imgUrl)}
          style={styles.avatar}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{`${name}, ${this.parseBirthDate(birthDate)}`}</Text>
          <View style={styles.locationWrapper}>
            <Icon name='map-marker' color={Colors.fontGrayDark} size={Fonts.scale(20)} style={styles.icon} />
            {!!userLocation
              ? <Text style={styles.description}>{`${calculateDistance(location, userLocation)} km`}</Text>
              : <ActivityIndicator color={Colors.fontGrayDark} size='small' style={styles.padding} />
            }
          </View>
          <Text
            numberOfLines={2}
            style={styles.description}
          >
            {`${name} is looking for ...`}
          </Text>
        </View>
      </View>
    )
  }

  render () {
    const { data } = this.props
    const { visible } = this.state

    return (
      visible
      ? <View
          style={styles.mainContainer}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.onOutPress}
            style={styles.touchableMask}
          />

          <Animatable.View
            duration={300}
            animation='fadeInUp'
            ref={this.handleCardRef}
            style={styles.modalContainer}
          >
            <Carousel
              data={[data.mainMarker, ...data.collected]}
              renderItem={this.renderItem}
              sliderWidth={Metrics.screenWidth}
              itemWidth={Fonts.scale(270)}
            />
          </Animatable.View>
        </View>
      : null  
    )
  }
}

const mapStateToProps = state => ({
  data: HangoutSelectors.currentCollectionSelector(state),
  userLocation: UserSelectors.userLocationSelector(state),
})

const mapDispatchToProps = {
  onOutPress: toggleUsersCardsModal
}

export const UsersMarkersCard = connect(mapStateToProps, mapDispatchToProps)(UsersMarkersCardView)
