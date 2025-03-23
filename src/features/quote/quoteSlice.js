import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRandomQuote = createAsyncThunk(
  "quote/fetchRandomQuote",
  async () => {
    try {
      const response = await axios.get("https://dummyjson.com/quotes");

      return response.data.quotes[
        Math.floor(Math.random() * response.data.quotes.length)
      ];
    } catch (error) {
      throw new Error(error);
    }
  }
);

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    quote: "",
    author: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quote = action.payload.quote;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;
