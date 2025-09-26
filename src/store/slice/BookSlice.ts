import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Book } from "../../components/types";

// Định nghĩa tham số phân trang + filter
interface PageAble {
  page: number;
  size: number;
  search: string;
}

// Lấy danh sách books có phân trang + tìm kiếm
export const getAllBooks = createAsyncThunk(
  "book/getBooks",
  async ({ page, size, search }: PageAble) => {
    const res = await axios.get(
      `http://localhost:8080/books?_page=${page}&_limit=${size}&title_like=${search}`
    );

    return {
      books: res.data,
      totalPage: Math.ceil(+res.headers["x-total-count"] / size),
    };
  }
);

// Thêm book
export const addBook = createAsyncThunk("book/addBook", async (newBook: Book) => {
  const res = await axios.post("http://localhost:8080/books", newBook);
  return res.data;
});

// Xoá book
export const deleteBook = createAsyncThunk("book/deleteBook", async (id: string) => {
  await axios.delete(`http://localhost:8080/books/${id}`);
  return id;
});

// Sửa book
export const editBook = createAsyncThunk("book/editBook", async (data: Book) => {
  const res = await axios.put(`http://localhost:8080/books/${data.id}`, data);
  return res.data;
});

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [] as Book[],
    loading: true,
    totalPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action: any) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.loading = false;
      })

      // add
      .addCase(addBook.fulfilled, (state: any, action: any) => {
        state.books.push(action.payload);
      })

      // delete
      .addCase(deleteBook.fulfilled, (state: any, action: any) => {
        const idx = state.books.findIndex((i: Book) => i.id === action.payload);
        if (idx !== -1) state.books.splice(idx, 1);
      })

      // edit
      .addCase(editBook.fulfilled, (state: any, action: any) => {
        const idx = state.books.findIndex((i: Book) => i.id === action.payload.id);
        if (idx !== -1) state.books[idx] = action.payload;
      });
  },
});

export default bookSlice.reducer;
