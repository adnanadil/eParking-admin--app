// This is the main store of the application which has the state and the reducers
// Gain we have learned about this library using the documentation of redux. 
import { configureStore } from '@reduxjs/toolkit'
import firebaseReducer from './firebase.slice'

export default configureStore({
  reducer: {
    firebaseSlice: firebaseReducer,
  },
})