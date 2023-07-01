import { configureStore } from "@reduxjs/toolkit";

import historyBookingReducer from "../features/booked/historyBookingSlice";

export const store = configureStore({
  reducer: {
    historyBooking: historyBookingReducer,
  },
});
