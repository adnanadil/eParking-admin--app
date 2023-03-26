import { createSlice } from '@reduxjs/toolkit'

export const firebaseSlice = createSlice({
  name: 'firebaseSlice',
  initialState: {
    selectedParkingLot: "",
  },
  reducers: {
    selectedParkingLotAction: (state, action) => {
      state.selectedParkingLot = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectedParkingLotAction } = firebaseSlice.actions

export default firebaseSlice.reducer