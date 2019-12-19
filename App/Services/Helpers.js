import { Alert } from 'react-native'

const showAlert = (message) =>
  Alert.alert(
    '',
    message,
    [
      {text: 'OK', onPress: () => {}},
    ],
    { cancelable: true }
  )

const isEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

const isDateValid = s => {
  const bits = s.split('/')
  let y = bits[2], m = bits[1], d = bits[0]
    
  // Assume not leap year by default (note zero index for Jan)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // If evenly divisible by 4 and not evenly divisible by 100,
  // or is evenly divisible by 400, then a leap year
  if ((!(y % 4) && y % 100) || !(y % 400)) {
    daysInMonth[1] = 29;
  }
  return !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m]
}

const calculateDistance = ({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 }, round = true) => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1)  // deg2rad below
  const dLon = deg2rad(lon2-lon1)
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
  return round ? parseFloat(R * c).toFixed(1) : R * c
}

const deg2rad = (deg) => deg * (Math.PI / 180)

export {
  showAlert,
  isEmail,
  isDateValid,
  calculateDistance,
}