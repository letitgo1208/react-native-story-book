import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import LinearGradient from 'react-native-linear-gradient'

import { HangoutSelectors, SetHangoutFiltersActions } from 'app/Redux/HangoutRedux'
import { Switch, Label, GenderGroup, Slider, GradientButton } from 'app/Components'

import styles, { topMaskGradient, bottomMaskGradient } from './FilterModalStyles'

class FilterModalView extends Component {
  state = {
    scrollEnabled: true
  }

  onValuesChangeStart = () => this.setState({ scrollEnabled: false })

  onValuesChangeFinish = () => this.setState({ scrollEnabled: true })

  render () {
    const { handleSubmit } = this.props
    const { scrollEnabled } = this.state

    return (
      <View style={styles.modalContainer}>
        <ScrollView style={styles.scrollView} scrollEnabled={scrollEnabled}>
          <Label
            label='Gender'
            style={[styles.label, styles.noMargin]}
          />
          <Field
            renderBoth
            name='gender'
            renderSeparator
            component={GenderGroup}
          />
          <Label
            label='Age'
            style={styles.label}
          />
          <Field
            min={18}
            max={60}
            name='age'
            component={Slider}
            onValuesChangeStart={this.onValuesChangeStart}
            onValuesChangeFinish={this.onValuesChangeFinish}
          />

          <GradientButton
            label='Find Your Buddy'
            // isLoading={isLoading}
            onPress={handleSubmit}
            containerStyle={styles.buttomMargin}
          />
        </ScrollView>
        <LinearGradient
          style={styles.topMask}
          colors={topMaskGradient}
        />
        <LinearGradient
          style={styles.bottomMask}
          colors={bottomMaskGradient}
        />
      </View>
    )
  }
}

const FilterModalForm = reduxForm({
  form: 'FilterForm',
})(FilterModalView)

const mapStateToProps = state => ({
  initialValues: HangoutSelectors.filterValuesSelector(state),
})

const mapDispatchToProps = {
  onSubmit: SetHangoutFiltersActions.Attempt 
}

export const FilterModal = connect(mapStateToProps, mapDispatchToProps)(FilterModalForm)
