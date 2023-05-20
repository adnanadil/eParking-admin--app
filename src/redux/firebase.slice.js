// This is a redux slice we have learned how to use this library by following the redux documentation 
// Redux documentation: https://redux.js.org/tutorials/quick-start
// based on this example we have used redux in our application.
import { createSlice } from '@reduxjs/toolkit'

export const firebaseSlice = createSlice({
  name: 'firebaseSlice',
  initialState: {
    selectedParkingLot: "",
    bookingsFound: [],
    allParkingLots: []
  },
  reducers: {
    selectedParkingLotAction: (state, action) => {
      state.selectedParkingLot = action.payload;
    },
    bookingsAction: (state, action) => {
      state.bookingsFound = action.payload;
    },
    allParkingLotsAction: (state, action) => {
      state.allParkingLots = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectedParkingLotAction, bookingsAction, allParkingLotsAction } = firebaseSlice.actions

export default firebaseSlice.reducer