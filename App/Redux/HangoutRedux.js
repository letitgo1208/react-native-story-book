import { path } from 'ramda'
import { createSelector } from 'reselect'

import { createAsyncAction, createAsyncType, createReducer } from 'app/Services/reduxHelpers'
import { Metrics, Fonts } from 'app/Themes'

//TODO: temporarly
import markers from 'app/Constants/Markers'

/* ------------- Types ------------- */

const UPDATE_REGION_TYPE = 'hangOut/UPDATE_REGION_TYPE'
const SET_HANGOUTS_FILTERS_TYPE = 'hangOut/SET_HANGOUTS_FILTERS_TYPE'
const TOGGLE_USERS_CARDS = 'hangOut/TOGGLE_USERS_CARDS'

/* ------------- Action Creators ------------- */

export const UPDATE_REGION = createAsyncType(UPDATE_REGION_TYPE)
export const UpdateRegionActions = createAsyncAction(UPDATE_REGION)

export const SET_HANGOUTS_FILTERS = createAsyncType(SET_HANGOUTS_FILTERS_TYPE)
export const SetHangoutFiltersActions = createAsyncAction(SET_HANGOUTS_FILTERS)

export const toggleUsersCardsModal = (currentCollection) => ({
  type: TOGGLE_USERS_CARDS,
  currentCollection,
})

const initialRegion = {
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
}
/* ------------- Initial State ------------- */

export const initialState = {
  users: [...markers],
  region: initialRegion,
  filters: {
    visibleToAll: true,
    visibleToFriends: false,
    gender: 'both',
    age: [18, 60],
    distance: [0, 100],
    hangoutOnly: false,
  },
  currentCollection: null,
}

/* ------------- Selectors ------------- */

const stateSelector = state => state.hangout

const usersSelector = state => stateSelector(state).users

const regionSelector = state => stateSelector(state).region

const currentCollectionSelector = state => stateSelector(state).currentCollection

//  Fonts.scale(55) --> imgsize

/*  max users in width ->  Metrics.screenWidth / Fonts.scale(60)
    max users in height -> Metrics.screenHeight / Fonts.scale(60)

lat radius -> latitudeDelta /  max users in width / 2
lng radius -> longitudeDelta /  max users in height / 2


    get first marker
    put inside everyone who is over him (radius imgsize)
    get next from the rest

    get frist, make box
    get next, check if is over first,
    get next chec if is over ever before, if not, make box

*/

const avatarSize = Fonts.scale(60)

const markersSelector = createSelector(
  usersSelector,
  regionSelector,
  (users, { latitudeDelta, longitudeDelta }) => {
    const r = (longitudeDelta / Metrics.screenWidth) * avatarSize * 55.6597
    const collectedMarkers = [
      {
        mainMarker: users[0],
        collected: [],
      }
    ]

    for (let i = 1; i < users.length; i++) {
      const user = users[i]
      const collectionIndex = collectedMarkers.findIndex(
        ({ mainMarker: { position: { latitude, longitude } } }) => {
          const latDiff = Math.abs(user.position.latitude - latitude) * 111.3194
          const lngDiff = Math.abs(user.position.longitude - longitude) * 55.6597

          return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2)) < r
        }
      )
      if (collectionIndex > -1) {
        collectedMarkers[collectionIndex].collected.push(user)
      } else {
        collectedMarkers.push({
          mainMarker: user,
          collected: [],
        })
      }
    }

    return [...collectedMarkers]
  }
)

const filterValuesSelector = state => stateSelector(state).filters

export const HangoutSelectors = {
  markersSelector,
  filterValuesSelector,
  currentCollectionSelector,
}

/* ------------- Reducers ------------- */

export const updateRegion = (state, { type, ...region }) => ({
  region: !region ? initialRegion : region
})

export const updateHangoutFilters = (state, { filters }) => ({
  filters
})

export const toggleUsersCards = (state, { currentCollection }) => ({
  currentCollection
})

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [UPDATE_REGION.ATTEMPT]: updateRegion,

  [SET_HANGOUTS_FILTERS.SUCCESS]: updateHangoutFilters,

  [TOGGLE_USERS_CARDS]: toggleUsersCards,
})
