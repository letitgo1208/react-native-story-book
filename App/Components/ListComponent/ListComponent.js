import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View, Image, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { connect } from 'react-redux'
import moment from 'moment'

import { Images, Colors, Fonts } from 'app/Themes'
import { UserSelectors } from 'app/Redux/UserRedux'
import { calculateDistance } from 'app/Services/Helpers'
import { Activities } from 'app/Constants/Activities'

import styles from './ListComponentStyles'

const tmp = [
  {
    profileId: 'dsaasd',
    name: 'Charlie',
    birthDate: '31-08-1992' ,
    activityId: 1,
    imgUrl: 'https://images-cdn.9gag.com/photo/aZxDem3_700b.jpg',
    location: {
      latitude: 124.23,
      longitude: -53.12,
    },
  }
]

class ListComponent extends PureComponent {
  parseUri = (uri) => !!uri ? { uri, width: 150, height: 150 } : Images.manDefault

  parseBirthDate = birthDate => moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years')

  extractKey = item => item.profileId

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
            {`${name} is looking for ${Activities[activityId]}`}
          </Text>
        </View>
      </View>
    )
  }

  render () {
    const { userLocation } = this.props

    return (
      <View style={styles.contentWrapper}>
        <View style={styles.listStyle}>
          <FlatList
            data={tmp}
            extraData={userLocation}
            renderItem={this.renderItem}
            keyExtractor={this.extractKey}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userLocation: UserSelectors.userLocationSelector(state)
})

export default connect(mapStateToProps)(ListComponent)
