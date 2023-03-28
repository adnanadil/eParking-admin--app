import { createSlice } from '@reduxjs/toolkit'

export const firebaseSlice = createSlice({
  name: 'firebaseSlice',
  initialState: {
    selectedParkingLot: "",
    bookingsFound: []
  },
  reducers: {
    selectedParkingLotAction: (state, action) => {
      state.selectedParkingLot = action.payload;
    },
    bookingsAction: (state, action) => {
      state.bookingsFound = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectedParkingLotAction, bookingsAction } = firebaseSlice.actions

export default firebaseSlice.reducer