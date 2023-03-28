import { configureStore } from '@reduxjs/toolkit'
import firebaseReducer from './firebase.slice'

export default configureStore({
  reducer: {
    firebaseSlice: firebaseReducer,
  },
})