import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Keyboard, Alert, Platform } from 'react-native'
import { connect } from 'react-redux'
import { path } from 'ramda'
import { Field, reduxForm, change, touch, untouch } from 'redux-form'
import ImagePicker from 'react-native-image-crop-picker'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Permissions from 'react-native-permissions'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { UpdateProfileActions, UserSelectors } from 'app/Redux/UserRedux'
import { Label, ProfileInput, MultilineInput, GenderGroup, GradientButton, GradientAvatar, DatePicker, ProfileInputText } from 'app/Components'
import { isDateValid, showAlert } from 'app/Services/Helpers'
import { Colors, Fonts } from 'app/Themes'

import styles from './ProfileScreenStyles'

class ProfileScreenView extends Component {
  keyboardTime = 0
  touched = false
  input = {}
  state = {
    newProfileImage: null
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
  }

  componentDidMount = async () => {
    if (Platform.OS === 'ios') {
      const result = await Permissions.check('photo', { type: 'always' })
      if (result !== 'authorized') {
        const finalPermission = await Permissions.request('photo')
        if (finalPermission === 'denied') {
          showAlert('If you would like to use gallery in the future, change permission for the app in the phone settings.')
        }
      }
    }
  }

  _keyboardDidShow = () => {
    this.keyboardTime = new Date().getTime()
  }

  componentWillReceiveProps ({ submitFailed }) {
    const { submitFailed: prevSubmitFailed, untouch } = this.props
    if (!prevSubmitFailed && submitFailed) {
      this.scrollView.scrollToPosition(0, 0)
      untouch('ProfileForm', 'birthDate')
    }
  }

  onScrollStart = () => {
    const { untouch } = this.props
    if (this.keyboardTime + 300 < new Date().getTime()) {
      Keyboard.dismiss()
    }
    if (this.touched) {
      untouch('ProfileForm', 'birthDate')
      this.touched = false
    }
  }

  handleRef = ref => { this.scrollView = ref }

  handleBirthToggle = () => {
    const { touch, untouch } = this.props
    if (!this.touched) {
      touch('ProfileForm', 'birthDate')
      this.scrollView.scrollToPosition(0, Fonts.verticalScale(180))
    } else {
      untouch('ProfileForm', 'birthDate')
    }
    this.touched = !this.touched
  }

  openGallery = async () => {
    const image = await ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      showCropGuidelines: false,
      mediaType: 'photo',
    })
    this.setState({ newProfileImage: image.path })
  }

  openCamera = async () => {
    const image = await ImagePicker.openCamera({
      width: 150,
      height: 150,
      cropping: true,
      showCropGuidelines: false,
    })
    this.setState({ newProfileImage: image.path })
  }

  handleOpenImagePicker = () => {
    Alert.alert(
      '',
      'Select from...',
      [
        { text: 'Camera', onPress: this.openCamera },
        { text: 'Gallery', onPress: this.openGallery },
        Platform.OS === 'ios' && { text: 'Cancel', style: 'cancelable' },
      ],
    )
  }

  showDatePicker = () => {
    Keyboard.dismiss()
    setTimeout(() => {
      this.scrollView.scrollToPosition(0, Fonts.verticalScale(160))
      this.props.touch('ProfileForm', 'birthDate')
      this.touched = true
    }, 100)
  }

  onSubmitEditing = index => () => this.input[index].getRenderedComponent().focus()

  handleRef = index => ref => { this.input[index] = ref }

  handleScrollRef = ref => { this.scrollView = ref }

  render () {
    const { newProfileImage } = this.state
    const { isUserLoading, submitting, submitFailed, handleSubmit, avatar, birthDate } = this.props
    const isLoading = submitting || isUserLoading

    return (
      <View>
        <KeyboardAwareScrollView
          ref={this.handleScrollRef}
          onScrollBeginDrag={this.onScrollStart}
          contentContainerStyle={styles.mainContainer}
        >

          <GradientAvatar
            backgroundColor={Colors.snow}
            uri={newProfileImage || avatar}
            onPress={this.handleOpenImagePicker}
          />

          <View style={[styles.itemContainer, styles.noPadding]}>

            <Label
              profileTitle
              label='First name'
            />
            <Field
              maxLength={64}
              name='firstName'
              returnKeyType='next'
              blurOnSubmit={false}
              autoCapitalize='words'
              component={ProfileInput}
              onSubmitEditing={this.onSubmitEditing(1)}
            />

            <Label
              profileTitle
              label='Last name'
              style={styles.noMargin}
            />
            <Label
              profileSubitle
              style={styles.marginBottom}
              label='Оnly for security, not shared with other users'
            />
            <Field
              withRef
              maxLength={64}
              name='lastName'
              returnKeyType='next'
              blurOnSubmit={false}
              autoCapitalize='words'
              ref={this.handleRef(1)}
              component={ProfileInput}
              onSubmitEditing={this.showDatePicker}
            />

          </View>

          <View style={styles.itemContainer}>
            <Label
              profileTitle
              label='Date of Birth'
            />
            <TouchableOpacity onPress={this.handleBirthToggle}>
              <View style={styles.row}>
                <View style={styles.birthItem}>
                  <ProfileInputText
                    submitFailed={submitFailed}
                    value={!!birthDate ? moment(birthDate).format('DD') : ''}
                  />
                </View>
                <View style={styles.birthSpace} />
                <View style={styles.birthItem}>
                  <ProfileInputText
                    submitFailed={submitFailed}
                    value={!!birthDate ? moment(birthDate).format('MM') : ''}
                  />
                </View>
                <View style={styles.birthSpace} />
                <View style={styles.birthItem}>
                  <ProfileInputText
                    submitFailed={submitFailed}
                    value={!!birthDate ? moment(birthDate).format('YYYY') : ''}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <Label
              small
              alignLeft
              label='Gender'
            />
          </View>

          <Field
            name='gender'
            component={GenderGroup}
          />

          <View style={[styles.margin, styles.background]} />

          <View style={[styles.itemContainer, styles.bigSpace]}>
            <View style={styles.margin} />

            <Label
              profileTitle
              label='About me'
            />
            <View style={styles.aboutMeWrapper}>
              <Field
                name='aboutMe'
                component={MultilineInput}
                placeholder={`You're one of a kind! Tell others about it!`}
              />
            </View>

          </View>

          <View style={styles.buttonWrapper}>
            <GradientButton
              label='Save'
              isLoading={isLoading}
              onPress={handleSubmit}
            />
          </View>

        </KeyboardAwareScrollView>

        <Field
          name='birthDate'
          component={DatePicker}
        />

      </View>
    )
  }
}

const validate = ({ firstName, lastName, birthDate }) => {
  const errors = {}

  if (!firstName) {
    errors.firstName = 'First name is required'
  }

  if (!lastName) {
    errors.lastName = 'Last name is required'
  }

  if (!birthDate) {
    errors.birthDate = 'Birtdate is required'
  }

  return errors
}

const mapStateToProps = state => {
  const birthday = path(['user', 'profile', 'birthday'], state)
  return ({
    initialValues: {
      gender: 'male',
      ...state.user.profile,
    },
    isUserLoading: UserSelectors.userLoadingSelector(state),
    avatar: UserSelectors.userAvatarSelector(state),
    birthDate: UserSelectors.userBirthDateSelector(state),
  })
}

const mapDispatchToProps = {
  changeField: change,
  onSubmit: UpdateProfileActions.Attempt,
  touch,
  untouch,
}

const ProfileForm = reduxForm({
  form: 'ProfileForm',
  validate
})(ProfileScreenView)

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
