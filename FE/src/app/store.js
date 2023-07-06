import { configureStore } from "@reduxjs/toolkit";

import historyBookingReducer from "../features/booked/historyBookingSlice";
import compareReducer from "../features/compare/compareSlice";

export const store = configureStore({
  reducer: {
    historyBooking: historyBookingReducer,
    compare: compareReducer,
  },
});
