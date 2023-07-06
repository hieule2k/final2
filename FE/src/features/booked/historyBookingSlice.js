import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchHistoryBooking = createAsyncThunk(
  "historyBooking,fetchHistoryBooking",
  async ({ userId }) => {
    const res = await axios.get(
      `http://103.184.113.181:88/customer_bookings?limit=10&page=1&customer_id=${userId}`
    );
    return res.data.items;
  }
);

export const deleteHistoryBooking = createAsyncThunk(
  "historyBooking,deleteHistoryBooking",
  async ({ itemId }) => {
    await axios.post(`http://103.184.113.181:88/cancel_booking/${itemId}`);

    return itemId;
  }
);

export const historyBookingSlice = createSlice({
  name: "historyBooking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHistoryBooking.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchHistoryBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.data = action.payload;
        }
      })
      .addCase(fetchHistoryBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteHistoryBooking.fulfilled, (state, action) => {
        const newData = state.data.filter((item) => item.id !== action.payload);
        state.data = newData;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = historyBookingSlice.actions;

export default historyBookingSlice.reducer;

export const getAllHistory = (state) => state.historyBooking.data;
export const getCancelledHistory = (state) => {
  return state.historyBooking.data.filter(
    (hotel) => hotel.status === "cancelled"
  );
};

export const getCompletedHistory = (state) => {
  return state.historyBooking.data.filter(
    (hotel) => hotel.status === "completed"
  );
};
