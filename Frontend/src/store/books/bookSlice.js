import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../service/bookService";

// Initial state for books slice
const initialState = {
  books: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch books
export const fetchAllBookAsync = createAsyncThunk("/fetchBook", async () => {
  const response = await fetchAllBooks();
  return response.data;
});

// Async thunk to create a book
export const createBookAsync = createAsyncThunk(
  "/createBook",
  async (userData) => {
    const response = await createBook(userData);
    return response.data;
  }
);

// Async thunk to update a book
export const updateBookAsync = createAsyncThunk(
  "/updateBook",
  async ({ id, ...userData }) => {
    console.log(userData, "user data");
    const response = await updateBook({ id, userData });
    return response.data;
  }
);

// Async thunk to delete a book
export const deleteBookAsync = createAsyncThunk("/deleteBook", async (id) => {
  await deleteBook(id);
  return id;
});

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBookAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchAllBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBookAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books.push(action.payload);
      })
      .addCase(createBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBookAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the book in state based on action.payload
        const updatedJobIndex = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (updatedJobIndex !== -1) {
          state.books[updatedJobIndex] = action.payload;
        }
      })
      .addCase(updateBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = state.books.filter((book) => book._id !== action.payload);
      })
      .addCase(deleteBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
